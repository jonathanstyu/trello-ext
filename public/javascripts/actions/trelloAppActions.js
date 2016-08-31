export const authorize = function() {
  return (dispatch) => {
    var that = this;
    new Promise(function(resolve, reject) {
      dispatch({type: "START_AUTH"})
      Trello.authorize({
        type: "popup",
        name: "Mentions",
        scope: {
          read: "true",
          write: "true"
        },
        expiration: "never",
        success: resolve(Trello),
        error: reject(Trello)
      });
    })
    .then(function (TrelloObject) {
      dispatch({type: "AUTH_RESPONSE", authorized: true})
    }).catch(function (TrelloObject) {
      dispatch({type: "AUTH_RESPONSE", authorized: false})
    });
  }
}

export const getItems = function () {
  return (dispatch) => {
    dispatch({type: "GETTING_ITEMS"})
    new Promise(function(resolve, reject) {
      Trello.get('/members/me/notifications', function (data) {
        resolve(data)
      }, function (error) {
        reject(error)
      })
    }).then(function (data) {
      dispatch({type: "ITEM_RESPONSE", response: true, data: data})
    }).catch(function (error) {
      dispatch({type: "ITEM_RESPONSE", response: false, data: error})
    })
  }
}
