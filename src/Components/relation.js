import React, { Component } from "react";
import { Text, View, TouchableOpacity, TouchableHighlight, ScrollView, StatusBar, StyleSheet } from "react-native";
import { NavigationActions, SafeAreaView } from "react-navigation";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Firebase from "./../Util/firebase";
import {Styles} from "./../Util";
import Toast from 'react-native-toastify';

var t = require('tcomb-form-native');
var db = Firebase.firestore();
var Form = t.form.Form;
var lodash = require('lodash');

const stylesheet = lodash.cloneDeep(Form.stylesheet);

// See https://github.com/gcanti/tcomb-form-native/blob/master/lib/templates/bootstrap/textbox.js
stylesheet.controlLabel.normal = Styles.ci_formLabel;

const options = {
  stylesheet: stylesheet
};

const type = t.enums.of([
  'isSkilled',           // Role -> Person
  'isRelated',           // Role -> Function
  'contains',            // Organisation -> Role
  'takesResponsibility', // Role -> Responsibility
  'isOrganized',         // Function -> Function
  'worksOn',             // Role -> Task
  'isSuccessor',         // Competence -> Competence
  'isChild',             // Role -> Role
  'hasAuthority',        // Role -> Authority
  'isRuledBy',           // Role -> Rule
  'isTrained'            // Person -> Task
], 'type')

const item = t.enums.of([
  'role',
  'function',
  'person',
  'responsibility',
  'competence',
  'authority',
  'rule',
  'task'
], 'item')

const status = t.enums.of([
  'draft',
  'deprecated',
  'accepted',
  'closed'
], 'status')

class RelationView extends Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.removeRelation = this.removeRelation.bind(this);
    this.loadSourceRelations = this.loadSourceRelations.bind(this);

    var docRef = db.collection('relations').doc(this.props.navigation.state.params.id);
    docRef.get().then((doc) => {
      if (doc.exists) {
         //console.log("Data:" +doc.data());
         this.setState({data: doc.data()})
         this.toastify.show('Geladen', 1000);
      } else {
        // doc.data() will be undefined in this case
        this.toastify.show('Keine Beziehung gefunden', 1000);
        //console.log("No such document!");
      }
    }).catch(function(error) {
      this.toastify.show('Laden fehlgeschlagen', 1000);
      console.log("Error getting document:", error);
    })

    //this.loadSourceRelations('role');
  }

  loadSourceRelations(type) {
    if (type==='role') {
    var docRef = db.collection('relations').where('source.item', '==', type);
    var relations = docRef.get()
    .then(querySnapshot => {
      var dataitems = [];
      querySnapshot.forEach((child) => {
        dataitems.push(`${child.data().title} (${child.data().id})`);
      });

  //    if(this.componentMounted){
        this.setState({
          sourceItems: dataitems,
        });
    //  }
      //  snapshot.forEach(doc => {
      //      console.log(doc.id, '=>', doc.data());
      //  });
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });
    }
  }

  submitForm() {
    const navigation = this.props.navigation;
    const params = navigation.state.params;

    if (params.mode === 'edit') {
      var formData = this.refs.form.getValue(); // get values from form
      if (formData) { // if validation fails, value will be null
  //      console.log("formData: "+formData);
        // get correct dataset from cloud
        var docRef = db.collection("relations").doc(`${params.id}`);

        // set data from form
        var data = {
          type: `${formData.type}`,
          comment: `${formData.comment}`,
          source: {
            item: `${formData.source.item}`,
            id: `${formData.source.id}`
          },
          target: {
            item: `${formData.target.item}`,
            id: `${formData.target.id}`
          },
          id: `${params.id}`,
          status: `${formData.status}`,
          labels: formData.labels
        };

  //      console.log("SAVE: "+data);

        this.setState({data: data});

        this.toastify.show('Gespeichert', 1000);

        // Update cloud-document
        docRef.update(data);

      }

      // set navigation-params to actual values
      navigation.setParams(formData);

    }

    // switch the edit-mode
    navigation.setParams({ mode: params.mode === 'edit' ? '' : 'edit' })
  }

  removeRelation() {
    const navigation = this.props.navigation;
    const params = navigation.state.params;
    const id = `${params.id}`;
    var deleteDoc = db.collection('relations').doc(id).delete();
    navigation.goBack();
  }

  onChange(value) {
  //  var formData = this.refs.form.getValue(); // get values from form
     if (value.type==='isRelated') {
       //console.log("Change: "+formData.comment);
       console.log(value.type);
     } else {
       console.log(value.type);
     }
     if (value.source) {
       if (value.source.item) {
         this.loadSourceRelations(value.source.item);
       }
     }
   }

  render() {
    if (this.state) {
      if (this.state.data) {

        const data = this.state.data;
        const navigation = this.props.navigation;
        const params = navigation.state.params;
        let viewMode = null;

        if (params.mode === 'edit') {
      //    if (  this.state.sourceItems ) {
          // View to Edit the role
          viewMode = <View style={Styles.ci_formContainer}>
            <Form
              ref="form"
              type={
                t.struct({
                  type,
                  source: t.struct({
                      id: t.maybe(t.String),
    //                id: t.enums.of([
    //                  this.state.sourceItems
    //                ], 'id'),
                    item
                  }),
                  target: t.struct({
                    id: t.maybe(t.String),
                    item
                  }),
                  comment: t.maybe(t.String),
                  status,
                  labels: t.list(t.String)
                })
              }
              options={options}
              value={data}
              onChange={this.onChange}
            />
            <TouchableHighlight style={styles.button} onPress={this.removeRole} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableHighlight>
          </View>
    //    }
        } else {
          viewMode =
            <View style={Styles.ci_formContainer}>
              <Text style={Styles.ci_formLabel}>ID</Text>
              <Text style={Styles.ci_formText}>{data.id}</Text>
              <Text style={Styles.ci_formLabel}>Typ</Text>
              <Text style={Styles.ci_formText}>{data.type}</Text>
              <Text style={Styles.ci_formLabel}>Von</Text>
              <Text style={Styles.ci_formText}>Typ: {data.source.item}</Text>
              <Text style={Styles.ci_formText}>Id: {data.source.id}</Text>
              <Text style={Styles.ci_formLabel}>Nach</Text>
              <Text style={Styles.ci_formText}>Typ: {data.target.item}</Text>
              <Text style={Styles.ci_formText}>Id: {data.target.id}</Text>
              <Text style={Styles.ci_formLabel}>Kommentar</Text>
              <Text style={Styles.ci_formText}>{data.comment}</Text>
              <Text style={Styles.ci_formLabel}>Status</Text>
              <Text style={Styles.ci_formText}>{data.status}</Text>
              <Text style={Styles.ci_formLabel}>Stichwörter</Text>
              {data.labels ? data.labels.map(function(label, index){
                   return <Text style={Styles.ci_formText} key={ index }>{label}</Text>;
              }) : <Text></Text>}
            </View>
        }

        return (
          <View>
           {viewMode}
           <Toast ref={(msg) => this.toastify = msg} />
         </View>
        )
      }
    } else {
      return <View><Text>Laden ...</Text></View>
    }

  }

  componentDidMount () {
    this.props.navigation.setParams({ handleEdit: this.submitForm })
  }

  static navigationOptions = props => {
      const { navigation } = props;
      const { state, setParams } = navigation;
      const { params } = state;
      return {
        headerTitle: `${params.title}`,
        headerTintColor: Styles.ci_Header.color,
        headerStyle: {
          height: Styles.ci_Header.height,
          backgroundColor: Styles.ci_Header.backgroundColor
        },
        // Render a button on the right side of the header.
        // When pressed switches the screen to edit mode.
        headerRight: (
            <FontAwesome
              name= {params.mode === 'edit' ? 'save' : 'edit'}
              size={18}
              style={{ color: Styles.ci_Header.color, paddingHorizontal: 5}}
              onPress={() => params.handleEdit()}
            />
        ),
      };
    };
}

var styles = StyleSheet.create({
buttonText: {
  fontSize: 18,
  color: 'white',
  alignSelf: 'center'
},
button: {
  height: 36,
  backgroundColor: '#D00000',
  borderColor: '#FF0000',
  borderWidth: 1,
  borderRadius: 8,
  margin: 0,
  alignSelf: 'stretch',
  justifyContent: 'center'
}
});

export default RelationView;

// Horizontal Line
//   <View style={{alignSelf:'center',position:'absolute',borderBottomColor:'black',borderBottomWidth:1,height:'50%',width:'90%'}}/>
