import _ from "lodash";

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

export const getBoards = function () {
  return (dispatch) => {
    dispatch({type: "GETTING_ITEMS", type: "boards"})
    new Promise(function(resolve, reject) {
      Trello.get('/members/me/boards', function (data) {
        resolve(data)
      }, function (error) {
        reject(error)
      })
    }).then(function (successDataObject) {
      console.log(successDataObject);
    }).catch(function (error) {
      dispatch({type: "ITEM_RESPONSE", response: false, data: error})
    })
  }
}

export const getItems = function () {
  return (dispatch) => {
    dispatch({type: "GETTING_ITEMS", type: "mentions"})
    new Promise(function(resolve, reject) {
      Trello.get('/members/me/notifications', function (data) {
        resolve(data)
      }, function (error) {
        reject(error)
      })
    }).then(function (successDataObject) {
      checkItemsAgainstLocal(successDataObject, dispatch);
    }).catch(function (error) {
      dispatch({type: "ITEM_RESPONSE", response: false, data: error})
    })
  }
}

const checkItemsAgainstLocal = function (dataObject, dispatch) {
  dispatch({type: "CHECKING_READ_STATUS"})
  // Check what is read and unread
  new Promise(function(resolve, reject) {
    if (window.localStorage) {
      dataObject.forEach(function (mention) {
        if (window.localStorage.getItem(mention.id)) {
          mention["readStatus"] = window.localStorage.getItem(mention.id, 'unread')
        } else {
          window.localStorage.setItem(mention.id, 'unread')
          mention["readStatus"] = "unread"
        }
      })
    } else {
      dataObject.forEach(function (mention) {
        mention["readStatus"] = "unread"
        window.localStorage.setItem(mention.id, 'unread')
      })

    }
    resolve(dataObject)
  }).then(function (checkedObject) {
    dispatch({type: "ITEM_RESPONSE", response: true, data: dataObject})
  }).catch(function (error) {
    dispatch({type: "CHECK_ERROR", response: error.message})
  })
}
