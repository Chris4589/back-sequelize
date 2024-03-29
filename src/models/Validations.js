const joi = require('joi');

const MIN_EMAIL = 4;
const MAX_EMAIL = 25

const MIN_PASSWORD = 4;
const MAX_PASSWORD = 15

exports.SchemaAUth = joi.object({
   correo: joi.string().required().min(MIN_EMAIL).max(MAX_EMAIL),
   password: joi.string().required().min(MIN_PASSWORD).max(MAX_PASSWORD)
});


exports.SchemaVision = {
   create: joi.object({
      description: joi.string().required().min(10),
      isActive: joi.bool().required()
   }),
   delete: joi.object({
      visionId: joi.number().required()
   })
};

exports.SchemaMission = {
   create: joi.object({
      description: joi.string().required().min(10),
      isActive: joi.bool().required()
   }),
   ById: joi.object({
      missionId: joi.number().required()
   })
};

exports.SchemaProyect = {
   create: joi.object({
      name_proyect:  joi.string().required().min(5),
      video:  joi.string().required().min(8).max(125),
      description:  joi.string().required().min(10),
      url: joi.array().optional()
   }),
   PhotoById: joi.object({
      photoId: joi.number().required()
   }),
   ProyectById: joi.object({
      proyectId: joi.number().required()
   })
};

exports.SchemaTeam = {
   create: joi.object({
      description: joi.string().required().min(10),
      fullName: joi.string().required().min(4),
      photo: joi.string().required().min(10),
      position: joi.string().required().min(4)
   }),
   ById: joi.object({
      groupId: joi.number().required()
   })
};

exports.SchemaRole = {
   create: joi.object({
      role: joi.string().required().min(4),
   })
};

exports.SchemaUser = {
   create: joi.object({
      correo: joi.string().required().min(MIN_EMAIL).max(MAX_EMAIL),
      name: joi.string().required().min(4),
      password: joi.string().required().min(MIN_PASSWORD).max(MAX_PASSWORD)
   })
};

exports.SchemaAbout = {
   create: joi.object({
      description: joi.string().required().min(10),
      title:  joi.string().required().min(4),
      isActive: joi.bool().required()
   }),
   ById: joi.object({
      aboutId: joi.number().required()
   })
};

