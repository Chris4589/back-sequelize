const express = require('express');
const config = require('config');
const cors = require('cors');

const utils = require('./utils/utils');
const schemas = require('./models/Validations');
const roleService = require('./services/roleService');
const userService = require('./services/userService');
const aboutService = require('./services/aboutService');
const workTeamService = require('./services/workTeamService');
const proyectService = require('./services/proyectService');
const MissionService = require('./services/MissionService');
const VisionService = require('./services/VisionService');
const AuthService = require('./services/AuthService');

require('./associations/index');

const app = express();
const port = config.get('localServer.port');

utils.connectDB()
    .authenticate()
    .then(()=> {
        app.use(cors());
        app.use(express.json());

        app.get(config.get('localServer.routeTest'), (_req, res) => {
            res.json({
                port,
                author: config.get('author.name'),
                email: config.get('author.email'),
                from: config.get('author.from'),
                date: new Date()
            });
        });

        app.get(config.get('localServer.routeRoles'), [
                utils.AuthVerify
        ], roleService.getRoles);

        app.post(config.get('localServer.routeRoles'), [

        ], roleService.createRole);

        app.post(config.get('localServer.routeUsers'), [

        ], userService.createUser);

        app.get(config.get('localServer.routeUsers'), [
                utils.AuthVerify
        ], userService.getUsers);

        app.post(config.get('localServer.routeAbout'), [

        ], aboutService.AboutPost);

        app.get(config.get('localServer.routeAbout'), [
                utils.AuthVerify
        ], aboutService.AboutList);

        app.put(config.get('localServer.routeAbout'), [

        ], aboutService.UpdateAbout);

        app.get(config.get('localServer.routeAboutActive'), [
                utils.AuthVerify
        ], aboutService.AboutGetBy);

        app.post(config.get('localServer.routeWorkTeam'), [

        ], workTeamService.createWorkTeam);

        app.get(config.get('localServer.routeWorkTeam'), [
                utils.AuthVerify
        ], workTeamService.ListWorkTeam);

        app.delete(config.get('localServer.routeWorkTeam'), [

        ], workTeamService.DeleteWorkTeam);

        app.put(config.get('localServer.routeWorkTeam'), [

        ], workTeamService.UpdateWorkTeam);

        app.post(config.get('localServer.routeProyects'), [
                utils.AuthVerify,
                utils.JoiValidate(schemas.SchemaProyect.create, 'body')
        ], proyectService.createProyect);

        app.get(config.get('localServer.routeProyects'), [
                utils.AuthVerify
        ], proyectService.getPosts);

        app.put(config.get('localServer.routeProyects'), [
                utils.AuthVerify,
                utils.JoiValidate(schemas.SchemaProyect.ProyectById, 'query'),
                utils.JoiValidate(schemas.SchemaProyect.create, 'body')
        ], proyectService.updateProyect);

        app.delete(config.get('localServer.routeProyects'), [
                utils.AuthVerify,
                utils.JoiValidate(schemas.SchemaProyect.ProyectById, 'query'),
        ], proyectService.deleteProyect);

        app.delete(config.get('localServer.routePhoto'), [
                utils.AuthVerify,
                utils.JoiValidate(schemas.SchemaProyect.PhotoById, 'query'),
        ], proyectService.deletePhoto);

        app.post(config.get('localServer.routeMission'), [
                utils.AuthVerify,
                utils.JoiValidate(schemas.SchemaMission.create, 'body')
        ], MissionService.CreateMission);

        app.get(config.get('localServer.routeMission'), [
                utils.AuthVerify
        ], MissionService.GetMissions);

        app.get(config.get('localServer.routeMissionActive'), [
                utils.AuthVerify
        ], MissionService.GetMissionsByActive);

        app.put(config.get('localServer.routeMission'), [
                utils.AuthVerify,
                utils.JoiValidate(schemas.SchemaMission.ById, 'query'),
                utils.JoiValidate(schemas.SchemaMission.create, 'body')
        ], MissionService.UpdateMission);

        app.delete(config.get('localServer.routeMission'), [
                utils.AuthVerify,
                utils.JoiValidate(schemas.SchemaMission.ById, 'query')
        ], MissionService.DeleteMission);

        app.post(config.get('localServer.routeVision'), [
                utils.AuthVerify,
                utils.JoiValidate(schemas.SchemaVision.create, 'body')
        ], VisionService.CreateVision);

        app.get(config.get('localServer.routeVision'), [
                utils.AuthVerify
        ], VisionService.GetVisions);

        app.get(config.get('localServer.routeVisionActive'), [
                utils.AuthVerify
        ], VisionService.GetVisionsByActive);

        app.put(config.get('localServer.routeVision'), [
                utils.AuthVerify,
                utils.JoiValidate(schemas.SchemaVision.delete, 'query'),
                utils.JoiValidate(schemas.SchemaVision.create, 'body')
        ], VisionService.UpdateVision);

        app.delete(config.get('localServer.routeVision'), [
            utils.JoiValidate(schemas.SchemaVision.delete, 'query'),
            utils.AuthVerify
        ], VisionService.DeleteVision);

        app.post(config.get('localServer.routeAuthLogin'), [
            utils.JoiValidate(schemas.SchemaAUth, 'body')
        ], AuthService.Login);

        app.use('*', utils.errNotFound);
        app.use(utils.hasErrors);
        app.listen(port, () => {
            console.log(`conectado en puerto ${port}`);
        });

    }).catch(({message}) => {
    console.log(`Error al conectarse a la DB: ${message}`)
});
