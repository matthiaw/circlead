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

const status = t.enums.of([
  'draft',
  'deprecated',
  'accepted',
  'closed'
], 'status')

var CompetenceForm = t.struct({
  // Id is hidden, because it should not be editable
  title: t.String,                // a required string
  description: t.maybe(t.String),  // an optional string
  status,
  labels: t.list(t.String)
});

class CompetenceView extends Component {

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.removeCompetence = this.removeCompetence.bind(this);

    var docRef = db.collection('competences').doc(this.props.navigation.state.params.id);
    docRef.get().then((doc) => {
      if (doc.exists) {
         //console.log("Data:" +doc.data());
         this.setState({data: doc.data()})
      //   this.toastify.show('Geladen', 1000);
      } else {
        // doc.data() will be undefined in this case
    //    this.toastify.show('Keine Kompetenz gefunden', 1000);
        //console.log("No such document!");
      }
    }).catch(function(error) {
  //    this.toastify.show('Laden fehlgeschlagen', 1000);
      console.log("Error getting document:", error);
    })
  }

  submitForm() {
    const navigation = this.props.navigation;
    const params = navigation.state.params;

    if (params.mode === 'edit') {
      var formData = this.refs.form.getValue(); // get values from form
      if (formData) { // if validation fails, value will be null
        // get correct dataset from cloud
        var docRef = db.collection("competences").doc(`${params.id}`);

        // set data from form
        var data = {
          title: `${formData.title}`,
          description: `${formData.description}`,
          id: `${params.id}`,
          status: `${formData.status}`,
          labels: formData.labels
        };

        //console.log(formData);
        //console.log(data);

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

  removeCompetence() {
    const navigation = this.props.navigation;
    const params = navigation.state.params;
    const id = `${params.id}`;
    var deleteDoc = db.collection('competences').doc(id).delete();
    navigation.goBack();
  }

  render() {
    if (this.state) {
      if (this.state.data) {
        const data = this.state.data;
        const navigation = this.props.navigation;
        const params = navigation.state.params;
        let viewMode = null;

        if (params.mode === 'edit') {
          // View to Edit the Competence
          viewMode = <View style={Styles.ci_formContainer}>
            <Form
              ref="form"
              type={CompetenceForm}
              options={options}
              value={data}
            />
            <TouchableHighlight style={styles.button} onPress={this.removeCompetence} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableHighlight>
          </View>
        } else {
          viewMode =
            <View style={Styles.ci_formContainer}>
              <Text style={Styles.ci_formLabel}>ID</Text>
              <Text style={Styles.ci_formText}>{data.id}</Text>
              <Text style={Styles.ci_formLabel}>Titel</Text>
              <Text style={Styles.ci_formText}>{data.title}</Text>
              <Text style={Styles.ci_formLabel}>Beschreibung</Text>
              <Text style={Styles.ci_formText}>{data.description}</Text>
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

export default CompetenceView;
