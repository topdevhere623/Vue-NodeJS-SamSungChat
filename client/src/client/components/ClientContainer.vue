<template>
<div>
      <router-view/>
</div>
</template>
<script>
export default {
  name: "ClientContainer",
  data() {
    return {
      login_form:{
        first_name:"",
        last_name:"",
        email:"",
      },

      username: {
        error: false,
        message: "",
        name: "User Name",
        value: "",
      },
      password: {
        error: false,
        message: "",
        name: "Password",
        value: "",
      },
    };
  },
  methods: {

    // loginUser() {
    //   //TODO:: Send request for login here
    //   if (this.checkInput("empty", [this.username, this.password])) {
    //         var data = {
    //           userName: this.username.value,
    //           password: this.password.value,
    //         };
    //         var config = {
    //           method: "post",
    //           url: "/api/auth/login",
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //           data: data,
    //         };
    //         let self = this;
    //         axios(config)
    //           .then(function (response) {
    //             if (User.responseAfterLogin(response.data)) {
    //               self.$router.push("dashboard");
    //             }
    //           })
    //           .catch(function (err) {
    //             self.displayError(self.username, "Invalid Username or Password");
    //           });
    //   }
    // },
    // displayError(target, message) {
    //   target.error = true;
    //   target.message = message;
    // },
    // checkInput(issue, ...target) {
    //   let list = [...target][0];
    //   let faults = 0;
    //   if (issue == "empty") {
    //     target[0].forEach((element) => {
    //       // console.log(element, element);
    //       if (issue == "empty") {
    //         if (!element.value) {
    //           // console.log(element.name);
    //           this.displayError(element, element.name + " Cannot Be Empty!");
    //           faults += 1;
    //         }
    //       }
    //     });
    //   } else {
    //     if (issue == "length") {
    //       if (list.value.length < 8) {
    //         this.displayError(
    //           list,
    //           list.name + " Must Be Atleast 8 Characters!"
    //         );
    //         faults += 1;
    //       }
    //     } else if (issue == "passwordStrength") {
    //       var strongRegex = new RegExp(
    //         "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    //       );
    //       if (!strongRegex.test(list.value)) {
    //         this.displayError(
    //           list,
    //           list.name +
    //             " Must Be Strong Or Must Contain An Uppercase Letter, Lowercase Letter, Number And Special Character Symbol!"
    //         );
    //         faults += 1;
    //       }
    //     }
    //   }

    //   return faults == 0;
    // },
  },
};
</script>
<style scoped>
</style>
