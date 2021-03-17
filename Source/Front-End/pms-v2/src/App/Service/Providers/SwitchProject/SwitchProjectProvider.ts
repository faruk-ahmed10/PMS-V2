import {Store} from "../../../../Global/Data/Store/Store";
import {SET_ACTIVE_PROJECT} from "../../../../Global/Data/Actions/Private/SwitchProject/SwitchProject.Action";

export class SwitchProjectProvider {
    __identifierPID: string;
    __identifierPName: string;

    constructor() {
        this.__identifierPID = '__active_project_id';
        this.__identifierPName = '__active_project_name';
    }

    setActiveProject(projectId: string | number, projectName: string): void {
        window.localStorage.setItem(this.__identifierPID, projectId.toString());
        window.localStorage.setItem(this.__identifierPName, projectName.toString());

        Store.dispatch(SET_ACTIVE_PROJECT({
            id: projectId,
            name: projectName,
        }));
    }

    getActiveProjectId(): any {
        return {
            id: window.localStorage.getItem(this.__identifierPID),
            name: window.localStorage.getItem(this.__identifierPName),
        }
    }

    removeActiveProject(): void {
        window.localStorage.removeItem(this.__identifierPID);
        window.localStorage.removeItem(this.__identifierPName);
    }
}