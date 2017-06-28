module.exports = function(db) {
  return {
    findOne: function findOne(opt) {
      return new Promise(function(resolve, reject) {
        db.findOne(opt, function(err, doc) {
          if (err) {
            reject(err)
          } else {
            resolve(doc)
          }
        })
      })
    },
    find: function find(opt) {
      return new Promise(function(resolve, reject) {
        db.find(opt, function(err, doc) {
          if (err) {
            reject(err)
          } else {
            resolve(doc)
          }
        })
      })
    },
    insert: function insert(opt) {
      return new Promise(function(resolve, reject) {
        db.insert(opt, function(err, doc) {
          if (err) {
            reject(err)
          } else {
            resolve(doc)
          }
        })
      })
    }
  }
}
