import { View, Text, ScrollView } from "react-native";
import React from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/Actions";
import styles from "./styles";

const ClientDetails = ( props ) => {
  const { clientDetails } = props;
  if(clientDetails){
    //do something
  }
  else{
    let dtls= clientDetails;
    console.log('details screen',clientDetails)
    clientDetails = {
      id: null,
      shortName: "",
      firstName: "",
      lastName: "",
      billingId: null,
      billing: null,
      currencyId: null,
      currency: null,
      clientStatusId: null,
      clientStatus: null,
      clientcontactdetailsdto: [
        {
          id: null,
          emailId: "",
          phoneNumber: "",
          address: "",
          mobile: null,
          fax: null,
          isPrimary: true,
          clientId: null,
        },
      ],
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={[styles.title, { fontSize: 30, marginBottom:35, textDecorationLine:'underline', textDecorationStyle:'double' }]}>
        CLIENT CONFIGURATION DETAILS
      </Text>
      <Text style={[styles.title, { marginTop: 20, fontWeight:'700', textDecorationStyle:'solid', textDecorationLine:'underline' }]}>CLIENT</Text>
      <Text style={styles.title}>CLIENT NAME</Text>
      <Text style={styles.details}>{clientDetails.shortName}</Text>

      <Text style={styles.title}>CURRENCY</Text>
      <Text style={styles.details}>{clientDetails.currencyName}</Text>

      <Text style={styles.title}>BILLING METHOD</Text>
      <Text style={styles.details}>{clientDetails.billingMethodName}</Text>

      <Text style={[styles.title, { marginTop: 20, fontWeight:'700', textDecorationLine:'underline'}]}>CONTACTS</Text>
      <Text style={styles.title}>EMAIL ID</Text>
      <Text style={styles.details}>{clientDetails.clientcontactdetailsdto[0].emailId}</Text>

      <Text style={styles.title}>FIRST NAME</Text>
      <Text style={styles.details}>{clientDetails.firstName}</Text>

      <Text style={styles.title}>LAST NAME</Text>
      <Text style={styles.details}>{clientDetails.lastName}</Text>

      <Text style={styles.title}>PHONE</Text>
      <Text style={styles.details}>{clientDetails.clientcontactdetailsdto[0].phoneNumber}</Text>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    projectDetails: state.Reducers.projectDetails,
    clientDetails: state.Reducers.clientDetails,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setProjectDetails: (params) => dispatch(actions.setProjectDetails(params)),
    setClientDetails: (params) => dispatch(actions.setClientDetails(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ClientDetails);
