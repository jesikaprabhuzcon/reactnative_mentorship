import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import Button from "../../components/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/Actions";
import { clientRecords } from "./dummyClients";
import { getAllClient } from "../../api/apis";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const stockData = [
  {
    name: "Abhyasika",
  },
  {
    name: "Akara Support",
  },
  {
    name: "CloudKitch",
  },
  {
    name: "EXL FNBO",
  },
  {
    name: "Fibar",
  },
  {
    name: "zCon Leaves",
  },
  {
    name: "zCon Project",
  },
];
const Client = (props) => {
  const {
    setClientDetails,
    clientDetails,
    navigation,
    refresh,
    setClientFilter,
    clientFilter,
  } = props;
  //console.log("client item", clientRecords);
  const [clientInfo, setClientInfo] = useState([]);
  useEffect(() => {
    console.log("getData useffect");
    getData();
    setClientFilter([]);
  }, [refresh]);

  const getData = async () => {
    console.log("client filter client screen", clientFilter);

    if (clientFilter != "") {
      console.log("inside client filter", clientFilter.clientName);
      const clientDt = await getAllClient(clientFilter.clientName);
      setClientInfo(clientDt.data.data);
      if (clientDt.data.errors != "") {
        alert(projectInfo.data.errors);
        setClientInfo(clientDt.data.data);
      }
    } else {
      const clientDt = await getAllClient("");
      setClientInfo(clientDt.data.data);
    }
  };
  const clientList = ({ item, index }) => {
    console.log("client item1", item);
    return (
      <View style={{ flexDirection: "row", marginTop: 10, width: "100%" }}>
        <Text
          style={styles.list}
          onPress={() => {
            clientRecords.map(async (record) => {
              console.log(item.firstName, record.firstName);

              console.log(
                "cli name match",
                item.clientcontactdetailsdto[0].clientId,
                String(item.clientcontactdetailsdto[0].clientId)
              );
              await AsyncStorage.setItem(
                "clientId",
                String(item.clientcontactdetailsdto[0].clientId)
              );
              setClientDetails(item);
              navigation.navigate("ClientDetails");
            });
          }}
        >
          {item.shortName}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {/* <Text style={[styles.title, {alignSelf:'center'}]}> No Clients Found</Text> */}

      <FlatList
        data={clientInfo}
        renderItem={clientList}
        //style={{marginTop: 20}}
        // style={{ marginBottom: 100}}
        keyExtractor={(item, index) => `key${index}`}
      />

      {/* <Button
        title="Add Project"
        color="#007bff"
        onPress={() => props.navigation.navigate("AddProject")}
      /> */}
      {/* <Button
        title=" Details"
        color="#007bff"
        customClick={() => props.navigation.navigate("ClientDetails")}
      /> */}
      <MaterialCommunityIcons
        name="plus-circle"
        size={80}
        color={"#00dbba"} //23bfa5
        style={{
          alignSelf: "flex-end",
          bottom: 20,
          position: "absolute",
          shadowOffset: {
            width: 3,
            height: 2,
          },
          shadowRadius: 2,
          shadowOpacity: 0.35,
        }}
        onPress={() => {
          setClientDetails(null);
          props.navigation.navigate("AddClient");
        }}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    projectDetails: state.Reducers.projectDetails,
    clientDetails: state.Reducers.clientDetails,
    clientFilter: state.Reducers.clientFilter,
    refresh: state.Reducers.refresh,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setProjectDetails: (params) => dispatch(actions.setProjectDetails(params)),
    setClientDetails: (params) => dispatch(actions.setClientDetails(params)),
    setClientFilter: (params) => dispatch(actions.setClientFilter(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Client);
