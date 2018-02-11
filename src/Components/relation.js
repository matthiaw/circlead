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
  'needsCompetence',     // Role -> Competence
  'hasAuthority',        // Role -> Authority
  'isRuledBy',           // Role -> Rule
  'isTrained'            // Person -> Task
], 'type')

const status = t.enums.of([
  'draft',
  'deprecated',
  'accepted',
  'closed'
], 'status')

class RelationView extends Component {

  constructor(props) {
    super(props);
    this.componentMounted = false;
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.removeRelation = this.removeRelation.bind(this);
    this.loadRelations = this.loadRelations.bind(this);
    this.setRelations = this.setRelations.bind(this);

    var docRef = db.collection('relations').doc(this.props.navigation.state.params.id);
    docRef.get().then((doc) => {
      if (doc.exists) {
        this.setRelations(doc.data().type, doc.data());
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    })
  }

  setRelations(type, data) {
    if (type==='isSkilled') {
      data.source.item = 'role';
      data.target.item = 'person';
      data.type = type;
      this.loadRelations('source', 'role', data);
      this.loadRelations('target', 'person', data);
    } else if (type==='isRelated') {
      data.source.item = 'role';
      data.target.item = 'function';
      data.type = type;
      this.loadRelations('source', 'role', data);
      this.loadRelations('target', 'function', data);
    } else if (type==='worksOn') {
      data.source.item = 'role';
      data.target.item = 'task';
      data.type = type;
      this.loadRelations('source', 'role', data);
      this.loadRelations('target', 'task', data);
    } else if (type==='isChild') {
      data.source.item = 'role';
      data.target.item = 'role';
      data.type = type;
      this.loadRelations('source', 'role', data);
      this.loadRelations('target', 'role', data);
    } else if (type==='hasAuthority') {
      data.source.item = 'role';
      data.target.item = 'authority';
      data.type = type;
      this.loadRelations('source', 'role', data);
      this.loadRelations('target', 'authority', data);
    } else if (type==='isRuledBy') {
      data.source.item = 'role';
      data.target.item = 'rule';
      data.type = type;
      this.loadRelations('source', 'role', data);
      this.loadRelations('target', 'rule', data);
    } else if (type==='takesResponsibility') {
      data.source.item = 'role';
      data.target.item = 'responsibility';
      data.type = type;
      this.loadRelations('source', 'role', data);
      this.loadRelations('target', 'responsibility', data);
    } else if (type==='needsCompetence') {
      data.source.item = 'role';
      data.target.item = 'competence';
      data.type = formData.type;
      this.loadRelations('source', 'role', data);
      this.loadRelations('target', 'competence', data);
    } else if (type==='contains') {
      data.source.item = 'organisation';
      data.target.item = 'role';
      data.type = type;
      this.loadRelations('source', 'organisation', data);
      this.loadRelations('target', 'role', data);
    } else if (type==='isOrganized') {
      data.source.item = 'function';
      data.target.item = 'function';
      data.type = type;
      this.loadRelations('source', 'function', data);
      this.loadRelations('target', 'function', data);
    } else if (type==='isSuccessor') {
      data.source.item = 'competence';
      data.target.item = 'competence';
      data.type = type;
      this.loadRelations('source', 'competence', data);
      this.loadRelations('target', 'competence', data);
    } else if (type==='isTrained') {
      data.source.item = 'person';
      data.target.item = 'task';
      data.type = type;
      this.loadRelations('source', 'person', data);
      this.loadRelations('target', 'task', data);
    }
  }

  loadRelations(direction, type, data) {
    const navigation = this.props.navigation;
    const params = navigation.state.params;

    if (type==='role') {
      var docRef = db.collection('roles');//.where('source.item', '==', type);
      var relations = docRef.get().then(querySnapshot => {
        var dataitems = [];
        querySnapshot.forEach((child) => {
          var entry = child.data().title +"("+child.data().id+")";
          dataitems.push(entry);
        });
          if(this.componentMounted){
        if (direction==='source') {
            this.setState({data: data, sourceItems: dataitems});
        };
        if (direction==='target') {
            this.setState({data: data, targetItems: dataitems});
        };
      }
      })
      .catch(err => {
          console.log('Error getting documents', err);
      });
    }
    if (type==='person') {
      var docRef = db.collection('persons');//.where('source.item', '==', type);
      var relations = docRef.get().then(querySnapshot => {
        var dataitems = [];
        querySnapshot.forEach((child) => {
          var entry = child.data().firstname+" "+child.data().familyname +"("+child.data().id+")";
          dataitems.push(entry);
        });
          if(this.componentMounted){
        if (direction==='source') {
            this.setState({data: data, sourceItems: dataitems});
        };
        if (direction==='target') {
            this.setState({data: data, targetItems: dataitems});
        };
      }
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

        // get correct dataset from cloud
        var docRef = db.collection("relations").doc(`${params.id}`);

        // set data from form
        var data = {
          type: `${formData.type}`,
          comment: `${formData.comment}`,
          source: {
            item: `${formData.source.item}`,
            sourceId: `${formData.source.sourceId}`
          },
          target: {
            item: `${formData.target.item}`,
            aimId: `${formData.target.aimId}`
          },
          id: `${params.id}`,
          status: `${formData.status}`,
          labels: formData.labels
        };

        if(this.componentMounted){
          this.setState({data: data});
        }

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

  onChange(formData) {
    if(this.componentMounted){
      this.setState({data: formData});
    }
    if (formData.type!==this.state.data.type) {
       this.setRelations(formData.type, this.state.data);
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
          var sourceId = t.enums.of(['empty', 's'], 'sourceId');
          var aimId = t.enums.of(['empty', 'g'], 'aimId');
          if (this.state.sourceItems) {
            sourceId = t.enums.of(this.state.sourceItems, 'sourceId');
          }
          if (this.state.targetItems) {
            aimId = t.enums.of(this.state.targetItems, 'aimId');
          }

          // View to Edit the role
          viewMode = <View style={Styles.ci_formContainer}><ScrollView>
            <Form
              ref="form"
              type={
                t.struct({
                  type,
                  source: t.struct({
                      sourceId,
                      item: t.maybe(t.String)
                  }),
                  target: t.struct({
                    aimId,
                    item: t.maybe(t.String)
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
            <TouchableHighlight style={styles.button} onPress={this.removeRelation} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableHighlight>
          </ScrollView></View>
        } else {
          viewMode =
            <View style={Styles.ci_formContainer}>
              <Text style={Styles.ci_formLabel}>ID</Text>
              <Text style={Styles.ci_formText}>{data.id}</Text>
              <Text style={Styles.ci_formLabel}>Typ</Text>
              <Text style={Styles.ci_formText}>{data.type}</Text>
              <Text style={Styles.ci_formLabel}>Von</Text>
              <Text style={Styles.ci_formText}>{data.source.item}: {data.source.sourceId}</Text>
              <Text style={Styles.ci_formLabel}>Nach</Text>
              <Text style={Styles.ci_formText}>{data.target.item}: {data.target.aimId}</Text>
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

  componentWillUnmount() {
     this.componentMounted = false;
  }

  componentDidMount () {
    this.componentMounted = true;
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
