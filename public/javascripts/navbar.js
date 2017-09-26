/*
  navbar

*/
// add/subtract emails here to change permissions

var model = {
  init: function(){
    this.teamEmails = 
      ['rb696@cornell.edu',
      'kaf222@cornell.edu',
      'dem292@cornell.edu', 
      'kaf222@cornell.edu',
      'dem292@cornell.edu',
      'oai2@cornell.edu',
      'ab873@cornell.edu',
      'jsf239@cornell.edu',
      'dm585@cornell.edu',
      'kwf37@cornell.edu',
      'wsm64@cornell.edu',
      'cdm223@cornell.edu',
      'ppm44@cornell.edu',
      'fk233@cornell.edu',
      'feb45@cornell.edu',
      'mo345@cornell.edu',
      'ad765@cornell.edu',
      'js2572@cornell.edu',
      'dhg73@cornell.edu'];
  }
}

//initialize page with private tabs hidden

var navBarView = {
  init: function(){
    var privateTabs = []
    privateTabs.push($("#graphi"))
    privateTabs.push($("#navi"))
    privateTabs.push($("#g-signout"))
    this.privateTabs = privateTabs
    this.hidePrivateTabs()
  },

  hidePrivateTabs: function(){
    $.each(this.privateTabs, function() {
      this.hide();
    });
  },

  showPrivateTabs: function(){
    $.each(this.privateTabs, function() {
      this.show();
    });
  }
}

var loginView = {
  init: function(){
    // hidden class used so these elements load hidden and don't wait for jquery
    //remove hidden classes for first login, then show
    this.logout();

    $("#graphi").removeClass('hidden');
    $("#navi").removeClass('hidden');
    $("#g-signout").removeClass('hidden');
    $("#account-details").removeClass('hidden');
  },

  login: function(profile){
    $("#user-icon").hide();
    //show private tabs
    
    $("#account-details").show();
    console.log(profile.getName()+" signed in")
    // display name
    $("#signin-nav").text(profile.getName());
    //hide sign in button
    $("#g-signin").hide();
    $("#g-signout").show();

    $("#d-name").text(profile.getName());
    $("#d-email").text(profile.getEmail());
    $('#propic').append('<img id="profile" src="'+profile.getImageUrl()+'" />')
  },

  logout: function(){
    controller.logout()

    //hide signout button, profile pic, and details
    $("#g-signout").hide();
    //delete propic so it doesnt show up for a different user
    $('#profile').remove();
    $("#account-details").hide();

    //change navbar text
    $("#signin-nav").text("Team Sign In");
    $("#user-icon").show();
  }
}

var controller = {
  init: function(){
    model.init()
    navBarView.init()
  },
  login: function(profile){
    loginView.login(profile)
    navBarView.showPrivateTabs()
  },
  logout: function(){
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });

    navBarView.hidePrivateTabs();
    loginView.logout();
  }
}

controller.init()

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  if($.inArray(profile.getEmail(), model.teamEmails)!=-1){
    controller.login(profile);
  }
  else{
    //alert unauthorized user
    console.log("unauthorized user!");
    alert('who are you!');
    controller.logout()
  }
}

function renderButton() {
  gapi.signin2.render('my-signin2', {
    'scope': 'profile email',
    'width': 200,
    'height': 30,
    'longtitle': true,
    'theme': 'dark'
  });
}