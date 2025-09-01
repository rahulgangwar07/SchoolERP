import { Component, OnInit } from '@angular/core';
import { PermissionsService } from '../../../Services/permissions.service';
import { ModuleService } from '../../../Services/module.service';
import { AuthServiceService } from '../../../Services/AuthServiceService';

// Permissions structure for each module
interface Permission {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  triggered: boolean;
}

// Module structure representing each module in the ERP
interface Module {
  module_id: number;
  module_name: string;
  assigned: boolean;
  permissions: Permission;
}

interface Designation {
  des_id: number;
  des_title: string;
  modules: Module[];
}

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {

  togglePermission: number | null = null;
  designations: Designation[] = [];
  permissionSubmitted: boolean = false;

  constructor(
    private _permissionService: PermissionsService,
    private _moduleService: ModuleService,
    private _authService: AuthServiceService
  ) { }

  ngOnInit() {
    this.bindPermissions();
  }

  bindPermissions() {
    this._permissionService.getPermissions().subscribe(
      (data) => {
        console.log("Permission data: ", data);
        this.designations = data;
      },
      (error) => {
        console.log("Error on permission Loading! ", error);
      }
    );
  }

  togglePermissions(index: number) {
    this.permissionSubmitted = false;
    this.togglePermission = this.togglePermission === index ? null : index;
  }

  showPermissions(module: Module): boolean {
    return module.assigned;
  }

  assignPermission(module: Module[], desig_id: number) {
    const m = module.filter((module: Module) => module.permissions.triggered);

    this._permissionService.postPermission(desig_id, m).subscribe(
      (response) => {
        console.log("Success: ", response);
        this.permissionSubmitted = true;
        this.resetSubmitMessage();  // Reset the message after 3 seconds
      },
      (error) => {
        console.log("Error on saving permission! ", error);
      }
    );
  }

  onModuleAssignedChange(designation: Designation, module: Module, event: any) {
    if (event.target.checked) {
      this._permissionService.assignsubModule(designation.des_id, module.module_id).subscribe(
        (success) => {
          console.log("Module Assigned: ", success);
        },
        (error) => {
          console.log("Error in Module Assigned: ", error);
        }
      )
    } else {
      const school_id = this._authService.getSchoolID();
      this._moduleService.deleteAllModule(module.module_id, designation.des_id, school_id).subscribe(
        (success) => {
          console.log("Module Deleted! ", success);
        },
        (error) => {
          console.log("Module is not being deleted: ", error);
        }
      );
    }
  }

  onPermissionChange(module: Module) {
    module.permissions.triggered = true;
  }

  resetSubmitMessage() {
    setTimeout(() => {
      this.permissionSubmitted = false;
    }, 3000);  
  }
}
