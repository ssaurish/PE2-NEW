


function handleLogin() {
  document.getElementById("signInButton").disabled = true;
  google.accounts.id.prompt((notification) => {
    if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
      console.log("SKIPPED :  " + notification.getSkippedReason());
      console.log("NOT DISPLAYED :  " + notification.getNotDisplayedReason());
      google.accounts.id.cancel();
      google.accounts.id.prompt();
      document.getElementById("signInButton").disabled = false;
    }
  });
}

function initializeGSI() {
  google.accounts.id.initialize({
    client_id:
      "679398685666-kd43rioln3vcgbhr61pno8vpmgbfn8ru.apps.googleusercontent.com",
    callback: handleGoogleSignIn,
    response_type: "token",
    use_fedcm_for_prompt : true,
  });
}

function handleGoogleSignIn(googleUser) {
  const tokenData = JSON.parse(
    atob(
      googleUser.credential.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")
    )
  );
  const email = tokenData.email;
  alert(`Welcome ${tokenData.name}\nUsing Email : ${email}`)
  document.cookie=`LOGGEDIN= ${tokenData.name}`;
  window.location.href = "/"
}
