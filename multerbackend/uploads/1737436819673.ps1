## qs1----------------------------
db.oyo.aggregate([
    {
        $match:{
            RATING:{$gte:4}
        }
    },
    {
        $count:'higherhotels'
    }
])



## qs2----------------------------
db.oyo.aggregate([
    {
        $project:{
            NAME:1
            ADDRESS:1
            _id:0
        }
    },
    {
        $sort:{
            FINAL_COST-1
        }
    }
    {
        $limit:5
    }
])



## qs3------------------------------
db.oyo.aggregate([
    {
        $project:{
            NAME:1,
            _id:0
        }
    },
    {
        $sort:{
            RATING:1
        }
    },
    {
        $skip:10
    },
    {
        $limit:5
    }
])



## qs4------------------------
db.oyo.aggregate([
    {
        $project:{
            NAME:1,
            RATING:1,
            _id:0
        }
    },
    {
        $sort:{
            RATING:-1
        }
    },
    {
        $limit:10
    }
])




## qs5-------------------------
db.oyo.aggregate([
    {
        $project:{
            NAME:1,
            ADDRESS:1,
            _id:0
        }
    }
])



## qs6----------------------
db.oyo.aggregate([
    {
        $project:{
            AMENITYS:1,
            "ROOM SIZE":2,
            _id:0
        }
    }
])


## qs7--------------------------
db.oyo.aggregate([
    {
        $project:{
            FINAL_COST:1,
            CATEGORY:1,
            _id:0
        }
    }
])


## qs8-------------------------------
db.oyo.aggregate([
    {
        $project:{
           NAME:1,
           IMAGES:1,
            _id:0
        }
    }
])



## qs9----------------------------------
db.oyo.find({
  $expr: { $gt: [{ $subtract: ['$FINAL_COST', '$BASE_COST'] }, 100] },
});



## qs10--------------------------------
db.oyo.aggregate([
    {
        $match:{
            AMENITYS:{$size:3}
        }
    },
    {
        $project:{
            NAME:1,
            _id:0,
        }
    }
])



## qs11--------------------------------
db.oyo.aggregate([
    {
        $match:{
           AMENITYS:"WIFI",
           AMENITYS:"AC"
        }
    },
    {
        $project:{
            NAME:1,
            _id:0
            AMENITYS:1
        }
    }

])


## qs12-------------------------------------
db.oyo.aggregate([
    {
        $match:{
            $or:[{AMENITYS:"WIFI"},{AMENITYS:"AC"}]
        }
    },
])


## qs13--------------------------------------------
db.oyo.find({},{RATING:5})


## qs14-----------------------------
db.oyo.aggregate([
    {
        $match:{
            ADDRESS:{$regex:"Telangana"}
        }
    }
])


## qs15-------------------------------
db.oyo.aggregate([
    {
        $limit:3
    }
])



## qs16-------------------------------
db.oyo.aggregate([
    {
        $sort:{
            RATING:-1
        }
    },
    {
        $limit:3
    }
])



## qs17-------------------------------
db.oyo.aggregate([
    {
        $sort:{
            BASE_COST:-1
        }
    }
])


## qs18---------------------------------
db.oyo.aggregate([
    {
        $sort:{
            NAME:1
        }
    }
])


## qs19----------------------------------------
db.oyo.aggregate([
    {
        $sort:{
            RATING:1
        }
    },
    {
        $skip:5
    }
])


## qs20-----------------------------------
db.oyo.aggregate([
    
    {
        $skip:2
    }
])