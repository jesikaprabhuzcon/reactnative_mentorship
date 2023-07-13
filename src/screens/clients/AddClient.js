import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "./styles";
import Buttons from "../../components/Button";
import DropdownComp from "../../components/dropdown/Dropdown";
import { useNavigation } from "@react-navigation/native";
import { connect, useDispatch } from "react-redux";
import * as actions from "../../redux/actions/Actions";
import { billingRecords } from "./dummyBillings";
import { currencyRecords } from "./dummyCurrency";
import {
  getbillingMethod,
  getcurrencies,
  postAddClient,
  updateClient,
} from "../../api/apis";

const AddClient = (props) => {
  const { clientDetails, setRefresh, refresh } = props;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const editedExpenseId = clientDetails;
  const isEditing = !!editedExpenseId;
  console.log("editing", isEditing);

  const [clientName, setClientName] = useState(
    isEditing ? clientDetails.shortName : ""
  );
  const [currencyId, setCurrencyId] = useState(
    isEditing ? clientDetails.currencyId : ""
  );
  const [billingMethodId, setBillingMethodId] = useState(
    isEditing ? clientDetails.billingId : ""
  );
  const [emailId, setEmailId] = useState(
    isEditing ? clientDetails.clientcontactdetailsdto[0].emailId : ""
  );
  const [firstname, setFirstname] = useState(
    isEditing ? clientDetails.firstName : ""
  );
  const [lastname, setLastname] = useState(
    isEditing ? clientDetails.lastName : ""
  );
  const [phone, setPhone] = useState(
    isEditing ? clientDetails.clientcontactdetailsdto[0].phoneNumber : ""
  );
  const [errors, setErrors] = useState({
    clientName: "",
    currency: "",
    billing: "",
    emailId: "",
    firstname: "",
    lastname: "",
    phone: "",
  });
  const [billingMethodNames, setBillingMethodNames] = useState([]);
  const [currencyNames, setCurrencyNames] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const billingM = await getbillingMethod();
    setBillingMethodNames(billingM.data.data);

    const currencyNm = await getcurrencies();
    setCurrencyNames(currencyNm.data.data);
    // console.log(billingMethodId, billingM.data.data, "state billing");
  };
  const currencies = [
    { label: "USD", value: "usd" },
    { label: "INR", value: "inr" },
    { label: "EUR", value: "eur" },
    { label: "AUD", value: "aud" },
  ];
  const billingMethods = [
    { label: "Billing Method 1", value: "billingMethod1" },
    { label: "Billing Method 2", value: "billingMethod2" },
    // Add more client options
  ];
  const handleCancel = () => {
    // Reset form values
    setCurrencyId("");
    setClientName("");
    setBillingMethodId("");
    setEmailId("");
    setFirstname("");
    setLastname("");
    setPhone("");
    setErrors({
      clientName: "",
      currency: "",
      billing: "",
      emailId: "",
      firstname: "",
      lastname: "",
      phone: "",
    });

    //setRefresh(!refresh)

    //navigation.goBack();
  };

  const handleSubmit = async () => {
    // Validation

    const validationErrors = {};

    // Validate client name
    if (!clientName.trim()) {
      validationErrors.clientName = "Please enter the client name.";
    }
    console.log("curr id", currencyId);
    // Validate currency
    if (!currencyId) {
      validationErrors.currency = "Please select the currency.";
    }
    if (!billingMethodId) {
      validationErrors.billing = "Please select the billing.";
    }
    // Validate email
    // if (emailId == "" && !emailId.trim()) {
    //   validationErrors.emailId = "Please enter the email ID.";
    // } else
    if (emailId != "" && !isValidEmail(emailId)) {
      validationErrors.emailId = "Please enter a valid email ID.";
    } else if (emailId == "") {
      validationErrors.emailId = "Please enter email id";
    }

    // Validate first name
    // if (firstname == "" && !firstname.trim()) {
    //   validationErrors.firstname = "Please enter the first name.";
    // } else

    if (firstname != "" && !isAlpha(firstname)) {
      validationErrors.firstname = "Please enter only text for the first name.";
    } else if (firstname == "") {
      validationErrors.firstname = "Please enter first name";
    }

    // Validate last name
    // if (lastname == "" && !lastname.trim()) {
    //   validationErrors.lastname = "Please enter the last name.";
    // } else
    if (lastname != "" && !isAlpha(lastname)) {
      validationErrors.lastname = "Please enter only text for the last name.";
    } else if (lastname == "") {
      validationErrors.lastname = "Please enter last name";
    }

    // Validate phone number
    // if (phone == "" && !phone.trim()) {
    //   validationErrors.phone = "Please enter the phone number.";
    // } else
    if (phone != "" && !isNumeric(phone)) {
      validationErrors.phone =
        "Please enter only numeric characters for the phone number.";
    } else if (phone == "") {
      validationErrors.phone = "Please enter phone number";
    }
    // if(emailId==""|| firstname==""|| lastname==""||phone==""){
    //   alert('Please fill in all the fields');
    // }
    setErrors(validationErrors);

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    // Process form submission, e.g., send data to server
    console.log("Submitted data:", {
      currencyId,
      clientName,
      billingMethodId,
      emailId,
      firstname,
      lastname,
      phone,
    });

    const objAddClient = {
      id: 0,
      shortName: clientName,
      firstName: firstname,
      lastName: lastname,
      billingId: billingMethodId.id,
      currencyId: currencyId.id,
      clientcontactdetailsdto: [
        {
          id: 0,
          emailId: emailId,
          phoneNumber: phone,
          address: "string",
          clientId: 0,
        },
      ],
    };
    console.log("object cli", objAddClient);
    if (isEditing) {
      const billingMethodIdType = typeof billingMethodId;
      const currencyIdType = typeof currencyId;
      const obj = {
        id: clientDetails.clientcontactdetailsdto[0].clientId,
        shortName: clientName,
        firstName: firstname,
        lastName: lastname,
        billingId:
          billingMethodIdType == "object"
            ? billingMethodId.id
            : billingMethodId,
        currencyId: currencyIdType == "object" ? currencyId.id : currencyId,
        clientcontactdetailsdto: [
          {
            id: 0,
            emailId: emailId,
            phoneNumber: phone,
            address: "string",
            clientId: clientDetails.clientcontactdetailsdto[0].clientId,
          },
        ],
      };
      const updateCt = await updateClient(obj);
      console.log("data updated success", updateCt);
      if (updateCt.status == 200 || updateCt.status == 201) {
        alert(updateCt.data.message);
        dispatch(actions.setRefresh(!refresh));
        console.log("refresh cli", refresh);
        // // Reset form values
        handleCancel();
        navigation.navigate("Clients");
      }
    } else {
      const addCt = await postAddClient(objAddClient);
      console.log("data added success", addCt.status);
      if (addCt.status == 201 || addCt.status == 200) {
        //alert("Client Added Successfully");
        alert(addCt.data.message);
        dispatch(actions.setRefresh(!refresh));
        console.log("refresh cli", refresh);
        // Reset form values
        handleCancel();
        navigation.goBack();
      }
    }
  };
  // Helper function to check if a string is a valid email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Helper function to check if a string contains only alphabetic characters
  const isAlpha = (value) => {
    const alphaRegex = /^[A-Za-z]+$/;
    return alphaRegex.test(value);
  };

  // Helper function to check if a string contains only numeric characters
  const isNumeric = (value) => {
    const numericRegex = /^[0-9]+$/;
    return numericRegex.test(value);
  };
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.container}>
        <Text style={[styles.title, { fontSize: 32, marginBottom: 25 }]}>
          CLIENT CONFIGURATION DETAILS
        </Text>

        <Text style={styles.title}>CLIENT</Text>

        <Text style={styles.title}>
          CLIENT NAME <Text style={{ color: "red" }}>*</Text>{" "}
        </Text>
        <TextInput
          style={[
            styles.input,
            { borderColor: errors.clientName ? "red" : "#FFD700" },
          ]}
          placeholder="Enter Value"
          value={clientName}
          placeholderTextColor={"#2b2b2b"}
          onChangeText={(text) => setClientName(text)}
        />
        {errors.clientName && (
          <Text style={styles.error}>{errors.clientName}</Text>
        )}
        <Text style={styles.title}>
          CURRENCY <Text style={{ color: "red" }}>*</Text>
        </Text>
        <DropdownComp
          data={currencyNames}
          maxHeight={150}
          labelField="name"
          valueField="id"
          placeholder={"Select"}
          searchPlaceholder="Search..."
          value={currencyId}
          borderColor={errors.currency ? "red" : "#FFD700"}
          // onfocus={() => setIsFocusZone(true)}
          // onblur={() => setIsFocusZone(false)}
          onchange={(text) => {
            console.log("text curreny", text);
            setCurrencyId(text);
          }}
          // title={'Client Name'}
          // isFocus={isFocusZone}
          isValueSet={true}
          style={styles.dropdown}
          //styleContainer={0.4}
          // color={colors.primary}
          error={errors.currency}
        />

        <Text style={styles.title}>BILLING METHOD</Text>
        <DropdownComp
          data={billingMethodNames}
          maxHeight={150}
          labelField="name"
          valueField="id"
          placeholder={"Select"}
          searchPlaceholder="Search..."
          value={billingMethodId}
          borderColor={errors.billing ? "red" : "#FFD700"}
          // onfocus={() => setIsFocusZone(true)}
          // onblur={() => setIsFocusZone(false)}
          onchange={(text) => {
            setBillingMethodId(text);
          }}
          // title={'Client Name'}
          // isFocus={isFocusZone}
          isValueSet={true}
          style={styles.dropdown}
          //styleContainer={2}
          // color={colors.primary}
          error={errors.billing}
        />
        {/* <Picker
        selectedValue={projectHead}
        onValueChange={(itemValue) => setProjectHead(itemValue)}
        style={styles.dropdown}
      >
        <Picker.Item label="Select Client Name" value="" />
        {projectHeads.map((client) => (
          <Picker.Item
            key={client.value}
            label={client.label}
            value={client.value}
          />
        ))}
      </Picker> */}

        <Text style={styles.title}>CONTACTS </Text>

        <Text style={styles.title}>EMAIL ID</Text>
        <TextInput
          style={[
            styles.input,
            { borderColor: errors.email ? "red" : "#FFD700" },
          ]}
          placeholder="Enter Value"
          value={emailId}
          placeholderTextColor={"#2b2b2b"}
          onChangeText={(text) => setEmailId(text)}
        />
        {errors.emailId && <Text style={styles.error}>{errors.emailId}</Text>}
        <Text style={styles.title}>FIRST NAME </Text>
        <TextInput
          style={[
            styles.input,
            { borderColor: errors.firstname ? "red" : "#FFD700" },
          ]}
          placeholder="Enter Value"
          value={firstname}
          placeholderTextColor={"#2b2b2b"}
          onChangeText={(text) => setFirstname(text)}
        />
        {errors.firstname && (
          <Text style={styles.error}>{errors.firstname}</Text>
        )}
        <Text style={styles.title}>LAST NAME </Text>
        <TextInput
          style={[
            styles.input,
            { borderColor: errors.lastname ? "red" : "#FFD700" },
          ]}
          placeholder="Enter Value"
          value={lastname}
          placeholderTextColor={"#2b2b2b"}
          onChangeText={(text) => setLastname(text)}
        />
        {errors.lastname && <Text style={styles.error}>{errors.lastname}</Text>}
        <Text style={styles.title}>PHONE </Text>
        <TextInput
          style={[
            styles.input,
            { borderColor: errors.phone ? "red" : "#FFD700" },
          ]}
          placeholder="Enter Value"
          value={phone}
          placeholderTextColor={"#2b2b2b"}
          onChangeText={(text) => setPhone(text)}
        />
        {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
        {/* <Button
          title="+ Assign Users"
          color="black"
          onPress={() => handleAddUser("User X")}
        /> */}
        {/* </View> */}
        {/* Display the selected users */}
        {/* <View style={styles.selectedUsersContainer}>
        {selectedUsers.map((user, index) => (
          <Text key={index} style={styles.selectedUser}>
            {user}
          </Text>
        ))}
      </View> */}

        <View style={styles.buttonContainer}>
          <View
            style={{
              backgroundColor: "#f27074",
              width: "50%",
              height: "30%",
              justifyContent: "center",
              marginRight: 10,
              borderRadius: 15,
            }}
          >
            <Button title="CANCEL" color="white" onPress={handleCancel} />
          </View>
          <View
            style={{
              backgroundColor: "#00dbba",
              width: "50%",
              height: "30%",
              justifyContent: "center",
              borderRadius: 15,
            }}
          >
            <Button title="SUBMIT" color="white" onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    projectDetails: state.Reducers.projectDetails,
    clientDetails: state.Reducers.clientDetails,
    refresh: state.Reducers.refresh,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setProjectDetails: (params) => dispatch(actions.setProjectDetails(params)),
    setClientDetails: (params) => dispatch(actions.setClientDetails(params)),
    setRefresh: (params) => dispatch(actions.setRefresh(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddClient);
