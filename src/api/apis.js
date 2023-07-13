import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// const baseURL1 = "https://10.235.3.7:1001/api/v1/zoho"
const baseURL = "http://10.235.3.7:2489/api/v1/zoho";
const getAllUsers = async () => {
  let token = await AsyncStorage.getItem("token");
  console.log("Generated token");
  token = JSON.parse(token);
  const AuthStr = "bearer ".concat(token.token);

  return await axios
    .get(`${baseURL}/users/getall`, {
      headers: {
        Authorization: AuthStr,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // alert(error.response.data.message);

      console.log("all users error", error);
      if (error.response) {
        console.log("err resp", error.response);
      } else if (error.request) {
        console.log("err req", error.request);
      } else if (error.message) {
        console.log("err msg", error.message);
      }
      ////alert(error.message);
    });
};
const getUserbyId = async (userId) => {
  let token = await AsyncStorage.getItem("token");
  console.log("Generated token");
  token = JSON.parse(token);
  const AuthStr = "bearer ".concat(token.token);
  return await axios
    .get(`${baseURL}/users/get?userId=${userId}`, {
      headers: {
        Authorization: AuthStr,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // alert(error.response.data);
      console.log("user by id error", error);
      if (error.response) {
        console.log("err resp", error.response);
      } else if (error.request) {
        console.log("err req", error.request);
      } else if (error.message) {
        console.log("err msg", error.message);
      }
      //alert(error.message);
    });
};
const postAddUsers = async (userDetails) => {
  let token = await AsyncStorage.getItem("token");
  console.log("Generated token");
  token = JSON.parse(token);
  const AuthStr = "bearer ".concat(token.token);
  return await axios
    .post(`${baseURL}/registration`, userDetails, {
      headers: {
        Authorization: AuthStr,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("add user details error", error);
      alert(error.response.data.message);
      if (error.response) {
        console.log("err resp", error.response);
      } else if (error.request) {
        console.log("err req", error.request);
      } else if (error.message) {
        console.log("err msg", error.message);
      }
      // alert(error.message);
    });
};
const updateUsers = async (userId, usersDetails) => {
  let token = await AsyncStorage.getItem("token");
  console.log("Generated token");
  token = JSON.parse(token);
  const AuthStr = "bearer ".concat(token.token);
  return await axios
    .put(`${baseURL}/users/update?userId=${userId}`, usersDetails, {
      headers: {
        Authorization: AuthStr,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      alert(error.response.data.message);
      if (error.response) {
        console.log("err resp", error.response);
      } else if (error.request) {
        console.log("err req", error.request);
      } else if (error.message) {
        console.log("err msg", error.message);
      }
      // alert(error.message);
    });
};
const deleteUsers = async (userId) => {
  let token = await AsyncStorage.getItem("token");
  console.log("Generated token");
  token = JSON.parse(token);
  const AuthStr = "bearer ".concat(token.token);
  return await axios
    .delete(`${baseURL}/users/delete?userId=${userId}`, {
      headers: {
        Authorization: AuthStr,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("users delete error", error);
      alert(error.response.data.message);
      if (error.response) {
        console.log("err resp", error.response);
      } else if (error.request) {
        console.log("err req", error.request);
      } else if (error.message) {
        console.log("err msg", error.message);
      }
      //alert(error.message);
    });
};
const postLogin = async (loginDetails) => {
  // let token = await AsyncStorage.getItem("token");
  // console.log("Generated token");
  // token = JSON.parse(token);
  // const AuthStr = "bearer ".concat(token.token);
  return await axios
    .post(`${baseURL}/login`, loginDetails, {
      // headers: {
      //   Authorization: AuthStr,
      //   "Content-Type": "application/json",
      // },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("post login details error", error.response.data.message);
      alert(error.response.data.message);
      if (error.response) {
        console.log("err resp", error.response);
      } else if (error.request) {
        console.log("err req", error.request);
      } else if (error.message) {
        console.log("err msg", error.message);
      }
      // alert(error.message);
    });
};
// axios.defaults.httpsAgent = NativeModules.Networking.HTTPSv3;
// const testPath= path.resolve(__dirname, 'src', 'Test.pfx')
// const certificate = require(testPath);
// const httpsAgent = axios.create({
//   httpsAgent: {
//     rejectUnauthorized: false,
//     ca: Platform.select({
//       android: certificate,
//       ios: Buffer.from(certificate, 'base64').toString(),
//     }),
//   },
// }).defaults.httpsAgent;
const getAllClient = async (clientName) => {
  let token = await AsyncStorage.getItem("token");
  console.log("Generated token");
  token = JSON.parse(token);
  const AuthStr = "bearer ".concat(token.token);
  return await axios
    .get(`${baseURL}/client/getall?clientName=${clientName}`, {
      headers: {
        Authorization: AuthStr,
        "Content-Type": "application/json",
      },
    })
    .then((respone) => {
      console.log("resp client", respone);
      // alert(respone);
      return respone;
    })
    .catch((error) => {
      // alert(error.response.data);
      if (error.response) {
        console.log("err resp", error.response);
      } else if (error.request) {
        console.log("err req", error.request);
      } else if (error.message) {
        console.log("err msg", error.message);
      }
    });
};
const getClientbyId = async (clientId) => {
  const token = await AsyncStorage.getItem("token");
  token = JSON.parse(token);
  const AuthStr = "bearer ".concat(token.token);
  return await axios
    .get(`${baseURL}/client/get?clientId=${clientId}`, {
      headers: {
        Authorization: AuthStr,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // alert(error.response.data);
      console.log("client by id error", error);
      if (error.response) {
        console.log("err resp", error.response);
      } else if (error.request) {
        console.log("err req", error.request);
      } else if (error.message) {
        console.log("err msg", error.message);
      }
      //alert(error.message);
    });
};
const postAddClient = async (clientDetails) => {
  let token = await AsyncStorage.getItem("token");
  console.log("Generated token");
  token = JSON.parse(token);
  const AuthStr = "bearer ".concat(token.token);
  return await axios
    .post(`${baseURL}/client/add`, clientDetails, {
      headers: {
        Authorization: AuthStr,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("add client details error", error);
      

      if (error.response) {
        alert(error.response.data.errors);
       // alert(error.response.data.message);
        console.log("err resp", error.response);
      } else if (error.request) {
        console.log("err req", error.request);
      } else if (error.message) {
        console.log("err msg", error.message);
      }
      // alert(error.message);
    });
};
const updateClient = async (clientDetails) => {
  let token = await AsyncStorage.getItem("token");
  console.log("Generated token");
  token = JSON.parse(token);
  const AuthStr = "bearer ".concat(token.token);
  // console.log("clientId update",  clientDetails);
  return await axios
    .put(`${baseURL}/client/update`, clientDetails, {
      headers: {
        Authorization: AuthStr,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // alert(error.response.data.message);

      if (error.response) {
        console.log("err resp", error.response);
      } else if (error.request) {
        console.log("err req", error.request);
      } else if (error.message) {
        console.log("err msg", error.message);
      }
      //alert(error.message);
    });
};
const deleteClient = async (clientId) => {
  let token = await AsyncStorage.getItem("token");
  console.log("Generated token");
  token = JSON.parse(token);
  const AuthStr = "bearer ".concat(token.token);
  return await axios
    .delete(`${baseURL}/client/delete?clientId=${clientId}`, {
      headers: {
        Authorization: AuthStr,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      alert(error.response.data.message);

      console.log("client delete error", error);
      if (error.response) {
        console.log("err resp", error.response);
      } else if (error.request) {
        console.log("err req", error.request);
      } else if (error.message) {
        console.log("err msg", error.message);
      }
      // alert(error.message);
    });
};
const getclientstatuses = async () => {
  let token = await AsyncStorage.getItem("token");
  console.log("Generated token");
  token = JSON.parse(token);
  const AuthStr = "bearer ".concat(token.token);
  return await axios
    .get(`${baseURL}/clientstatuses/getall`, {
      headers: {
        Authorization: AuthStr,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("client status error", error);
      if (error.response) {
        console.log("err resp", error.response);
      } else if (error.request) {
        console.log("err req", error.request);
      } else if (error.message) {
        console.log("err msg", error.message);
      }
      //  alert(error.message);
    });
};
const getbillingMethod = async () => {
  let token = await AsyncStorage.getItem("token");
  token = JSON.parse(token);
  const AuthStr = "bearer ".concat(token.token);
  console.log("Generated token", AuthStr);

  return await axios
    .get(`${baseURL}/billingmethods/ddl`, {
      headers: {
        Authorization: AuthStr,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("client billing methods error", error);
      if (error.response) {
        console.log("err resp", error.response);
      } else if (error.request) {
        console.log("err req", error.request);
      } else if (error.message) {
        console.log("err msg", error.message);
      }
      //  alert(error.message);
    });
};
const getcurrencies = async () => {
  let token = await AsyncStorage.getItem("token");
  console.log("Generated token");
  token = JSON.parse(token);
  const AuthStr = "bearer ".concat(token.token);
  return await axios
    .get(`${baseURL}/currencies/ddl`, {
      headers: {
        Authorization: AuthStr,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("client currencies error", error);
      if (error.response) {
        console.log("err resp", error.response);
      } else if (error.request) {
        console.log("err req", error.request);
      } else if (error.message) {
        console.log("err msg", error.message);
      }
      //  alert(error.message);
    });
};
const getRolesDdl = async () => {
  let token = await AsyncStorage.getItem("token");
  console.log("Generated token");
  token = JSON.parse(token);
  const AuthStr = "bearer ".concat(token.token);
  return await axios
    .get(`${baseURL}/roles/ddl`, {
      headers: {
        Authorization: AuthStr,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("roles error", error);
      if (error.response) {
        console.log("err resp", error.response);
      } else if (error.request) {
        console.log("err req", error.request);
      } else if (error.message) {
        console.log("err msg", error.message);
      }
      //  alert(error.message);
    });
};
const getByRoleDdl = async (role) => {
  let token = await AsyncStorage.getItem("token");
  console.log("Generated token");
  token = JSON.parse(token);
  const AuthStr = "bearer ".concat(token.token);
  console.log("role", role);
  return await axios
    // .get('http://10.235.3.7:2489/api/v1/zoho/projectusers/getbyrole/ddl?role=devuser')
    .get(`${baseURL}/projectusers/getbyrole/ddl?role=${role}`, {
      headers: {
        Authorization: AuthStr,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      //alert(response)
      return response;
    })
    .catch((error) => {
      console.log("by roles error", error);
      if (error.response) {
        console.log("err resp", error.response);
      } else if (error.request) {
        console.log("err req", error.request);
      } else if (error.message) {
        console.log("err msg", error.message);
      }
      //  alert(error.message);
    });
};
const getProjectStatusesDdl = async () => {
  let token = await AsyncStorage.getItem("token");
  console.log("Generated token");
  token = JSON.parse(token);
  const AuthStr = "bearer ".concat(token.token);
  return await axios
    .get(`${baseURL}/projectstatuses/ddl`, {
      headers: {
        Authorization: AuthStr,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("project status error", error);
      if (error.response) {
        console.log("err resp", error.response);
      } else if (error.request) {
        console.log("err req", error.request);
      } else if (error.message) {
        console.log("err msg", error.message);
      }
      //  alert(error.message);
    });
};
const postAddProject = async (projectDetails) => {
  let token = await AsyncStorage.getItem("token");
  console.log("Generated token");
  token = JSON.parse(token);
  const AuthStr = "bearer ".concat(token.token);
  return await axios
    .post(`${baseURL}/project/add`, projectDetails, {
      headers: {
        Authorization: AuthStr,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("add project details error", error);
      // alert(error.response.data.message);

      if (error.response) {
        alert(error.response.data.errors);
        console.log("err resp", error.response);
      } else if (error.request) {
        console.log("err req", error.request);
      } else if (error.message) {
        console.log("err msg", error.message);
      }
      // alert(error.message);
    });
};
const updateProject = async (projectObj) => {
  let token = await AsyncStorage.getItem("token");
  console.log("Generated token");
  token = JSON.parse(token);
  const AuthStr = "bearer ".concat(token.token);
  console.log("project update", projectObj);
  return await axios
    .put(`${baseURL}/project/update`, projectObj, {
      headers: {
        Authorization: AuthStr,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // console.log("resp proj updt", response);
      return response;
    })
    .catch((error) => {
      // if (error.response.data.message != "") {
      //   alert(error.response.data.message);
      // }
      if (error.response) {
        alert(error.response.data.errors);
        console.log("err resp", error.response);
      } else if (error.request) {
        console.log("err req", error.request);
      } else if (error.message) {
        console.log("err msg", error.message);
      }
      //alert(error.message);
    });
};
const postGetAllProject = async (projectDetails) => {
  let token = await AsyncStorage.getItem("token");
  console.log("Generated token");
  token = JSON.parse(token);
  const AuthStr = "bearer ".concat(token.token);
  return await axios
    .post(`${baseURL}/project/getall`, projectDetails, {
      headers: {
        Authorization: AuthStr,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("get all project details error", error);
      // alert(error.response.data);
      if (error.response) {
        console.log("err resp", error.response);
      } else if (error.request) {
        console.log("err req", error.request);
      } else if (error.message) {
        console.log("err msg", error.message);
      }
      // alert(error.message);
    });
};
const deleteProject = async (projectId) => {
  let token = await AsyncStorage.getItem("token");
  console.log("Generated token");
  token = JSON.parse(token);
  const AuthStr = "bearer ".concat(token.token);
  return await axios
    .delete(`${baseURL}/project/delete?projectId=${projectId}`, {
      headers: {
        Authorization: AuthStr,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // alert(error.response.data.message);

      console.log("project delete error", error);
      if (error.response) {
        console.log("err resp", error.response);
      } else if (error.request) {
        console.log("err req", error.request);
      } else if (error.message) {
        console.log("err msg", error.message);
      }
      // alert(error.message);
    });
};
export {
  getAllUsers,
  getUserbyId,
  postAddUsers,
  updateUsers,
  deleteUsers,
  postLogin,
  getAllClient,
  getClientbyId,
  postAddClient,
  updateClient,
  deleteClient,
  getclientstatuses,
  getbillingMethod,
  getcurrencies,
  getRolesDdl,
  getByRoleDdl,
  getProjectStatusesDdl,
  postAddProject,
  updateProject,
  postGetAllProject,
  deleteProject,
};
