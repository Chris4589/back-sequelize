const schemaRole = require('../models/Role');
const schemaUser = require('../models/User');
const schemaAbout = require('../models/About');
const schemaWork = require('../models/WorkTeam');
const schemaProyect = require('../models/Proyect');
const schemaPhoto = require('../models/ProyectPhotos');
// role -> user
schemaRole.roleModel().hasOne(schemaUser.userSchema(), {
    as: 'user',
    foreignKey: 'roleId'
});
schemaUser.userSchema().belongsTo(schemaRole.roleModel(), {
    as: 'role',
    foreignKey: 'roleId'
});

schemaUser.userSchema().hasMany(schemaAbout.AboutSchema(), {
    as: 'about',
    foreignKey: 'userId'
});

schemaAbout.AboutSchema().belongsTo(schemaUser.userSchema(), {
    as: 'user',
    foreignKey: 'userId'
});

schemaUser.userSchema().hasMany(schemaWork.WorkTeamSchema(), {
    as: 'work',
    foreignKey: 'userId'
});

schemaWork.WorkTeamSchema().belongsTo(schemaUser.userSchema(), {
    as: 'user',
    foreignKey: 'userId'
});

// user -> proyect
schemaUser.userSchema().hasMany(schemaProyect.ProyectSchema(), {
   as: 'proyect',
    foreignKey: 'userId'
});
schemaProyect.ProyectSchema().belongsTo(schemaUser.userSchema(), {
    as: 'user',
    foreignKey: 'userId'
});
// proyect -> photo
schemaProyect.ProyectSchema().hasMany(schemaPhoto.ProyectPhotosSchema(), {
    as: 'photos',
    foreignKey: 'photoId'
});

schemaPhoto.ProyectPhotosSchema().belongsTo(schemaProyect.ProyectSchema(), {
    as: 'proyect',
    foreignKey: 'photoId'
});

console.log(':)');
