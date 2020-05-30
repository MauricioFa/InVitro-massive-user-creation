const admin = require("firebase-admin");
require("dotenv").config();

class multiUserCreation {
  userCreation(jsonUsers) {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          type: "service_account",
          project_id: process.env.PROJECT_ID,
          private_key_id: process.env.PRIVATE_KEY_ID,
          private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
          client_email: process.env.CLIENT_EMAIL,
          client_id: process.env.CLIENT_ID,
          auth_uri: process.env.AUTH_URI,
          token_uri: process.env.TOKEN_URI,
          auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT,
          client_x509_cert_url: process.env.CLIENT_CERT,
        }),
        databaseURL: `https://${process.env.PROJECT_ID}.firebaseio.com/`,
      });
    }
    const db = admin.firestore();

    async function insertUsers(jsonUsers) {
      let messages = [];
      const users = jsonUsers
      for (let i = 0; i < jsonUsers.length; i++) {
        const message = await admin
          .auth()
          .createUser({
            email: jsonUsers[i]["email"],
            emailVerified: false,
            password: "ENtrANYmaTen",
            disabled: false,
          })
          .then(function (userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log("Successfully created new user:", userRecord.email, users);
            // Create users data en firestore
            db.collection("user").doc(users[i]["identityCard"]).set({
              name: jsonUsers[i]["name"],
              lastName: jsonUsers[i]["lastName"],
              documentType: jsonUsers[i]["documentType"],
              numberContact: jsonUsers[i]["numberContact"],
              rol: jsonUsers[i]["rol"],
              userStatus: true
            })
            .then(()=>{
              console.log("succesfully inserted")
            })
            .catch((error)=>{
              console.log(error)
            })
            return {
              "User email": jsonUsers[i]["email"],
              Result: "Succesfully created",
            };
          })
          .catch(function (error) {
            // console.log("Error creating new user:", error);
            return { "User email": jsonUsers[i]["email"], Result: error.code };
          });
        messages.push(message);
      }
      return messages;
    }

    // (async () => {
    //   const messaFinal = await insertUsers (jsonUsers)
    //   console.log(messaFinal)
    //   return messaFinal
    // })()
    const messageFinal = insertUsers(jsonUsers);
    messageFinal.then(function (result) {
      // console.log(result)
      return messageFinal;
    });
  }
}

module.exports = multiUserCreation;
