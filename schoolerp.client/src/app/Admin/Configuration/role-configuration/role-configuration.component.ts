import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { DesignationService } from '../../../Services/designation.service';
import { ModuleService } from '../../../Services/module.service';
import { AuthServiceService } from '../../../Services/AuthServiceService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-configuration',
  templateUrl: './role-configuration.component.html',
  styleUrl: './role-configuration.component.css'
})
export class RoleConfigurationComponent implements OnInit {

  designationList: any; designation_id: Number = 0;
  modules: any;  
  subids: Set<number> = new Set(); 
  subid: Set<number> = new Set();
  school_id: string = "";

  constructor(private _designationServie: DesignationService, private _moduleService: ModuleService, private _authService: AuthServiceService, private router: Router) { }
  ngOnInit() {
    this._designationServie.getAllDesignation().subscribe(
      (response) => {
        this.designationList = response; 
      },
      (error) => {
        console.log("Error in fetching designation data: ", error);
      }
    );

    this.school_id = this._authService.getSchoolID();
    if (!this.school_id) {
      // Redirect to login if school_id is missing
      this.router.navigate(['/login']);
      return;
    }

    this.moduleList();
  }

  moduleList() {
    this._moduleService.getModulewithSubmodule().subscribe(
      (response) => {
        this.modules = response; 
      },
      (error) => {
        console.log("Error in fetching modulelist data: ", error);
      }
    );
  }

  designationModules(id: Number) {

    this._moduleService.getmodulebyFaculty(id, this.school_id).subscribe(
      (response) => {
        // Early return if no response
        if (response.length === 0) {
          console.log("No modules found.");
          return;
        }
        if (response.length > 0) {
          const submoduleIds = response
            .filter((item: { submodule_id: any; }) => item.submodule_id)  // Filter out items without submodule_id
            .map((item: { submodule_id: any; }) => item.submodule_id)  // Map to get all submodule_id arrays
            .reduce((acc: string | any[], curr: any) => acc.concat(curr), []);  // Flatten arrays into one

          // Assign submoduleIds to this.subids
          this.subids = new Set(submoduleIds);  
          //for (let i = 0; i < response.length; i++) {
    
          //  if (response[i].submodule_id) { 
          //    for (let j = 0; j < response[i].submodule_id.length;j++) {
          //      this.subids.push(response[i].submodule_id[j]); 
          //    } 
          //  } 
          //}
        } 
      },
      (error) => {
        console.log("error generated! ", error);
      }
    );
  }

  designationChange(event: any) { 
    this.subids = new Set();
    this.designation_id = event.target.value;
    this.designationModules(event.target.value);

  }
  chkValue(id: Number): boolean {  
    //for (let i = 0; i < this.subids.length; i++) {
    //  if (id == this.subids[i])
    //    return true;
    //}
    //return false;
    return this.subids.has(Number(id));
  }

  submoduleChange(event: any, submodule: any) { 
    const submoduleId = Number(event.target.value);
    const parentModuleElement = event.target.closest('.module');
    let parentModuleId: Number = 0; 


    if (parentModuleElement) {
      const hiddenInput = parentModuleElement.querySelector('input[type="hidden"][id="mainhidden"]');
      if (hiddenInput) {
        parentModuleId = hiddenInput.value;
      }
    } else {
      console.error('Parent module element not found');
    }
    


    if (event.target.checked) {
      let ids = new Set<number>();
      const childModuleElement = event.target.closest('.submodules');
      let childModuleId: Number = 0;
      if (childModuleElement) {
        const hiddenInput = childModuleElement.querySelector('input[type="hidden"][id="subhidden"]');
        if (hiddenInput) {
          childModuleId = hiddenInput.value;
          if (childModuleId != submodule.submodule_id) {
            ids.add((Number)(childModuleId));
            this.subids.add((Number)(childModuleId));
          } 
        }
      } else {
        console.error('Parent module element not found');
      }
      ids.add(submoduleId); 
      submodule.childSubModules.forEach((mod: any) => {
        ids.add(mod.submodule_id);
        this.subids.add(mod.submodule_id);
      }); 

      this._moduleService.addModules(Array.from(ids), Number(this.designation_id), this.school_id).subscribe(
        (response) => { },
        (error) => {
          console.log("Error Found!", error);
        }
      );
    } else { 
      this.subids.delete(submoduleId);
      //delete all submodule
      this._moduleService.deleteModule(parentModuleId, submoduleId, Number(this.designation_id), this.school_id).subscribe(
        (response) => {
          if (Array.isArray(response)) {
            response.forEach((id: number) => {
              this.subids.delete(id);   
            });
          } else {
            this.subids.delete(response);   
          }
        },
        (error) => {
          console.log("Module not deleted..", error);
        }
      );
    }

    // Check if all submodules are selected, if yes, select the parent module
    const allSubmodulesSelected = Array.from(parentModuleElement.querySelectorAll('.submodules .form-check-input'))
      .every((input: HTMLInputElement|any) => input.checked);

    const parentCheckbox = parentModuleElement.querySelector('input[type="checkbox"]');
    if (parentCheckbox) {
      parentCheckbox.checked = allSubmodulesSelected;
    }
     
  }



  //selectAllchildsubmodule() {

  //}


  selectAllsubmodule(event: any, module: any) {
    this.subid = new Set(); 
    if (event.target.checked) { 
      module.subModules.forEach((submodule:any) => { 
        this.subid.add(submodule.submodule_id);
        //this.subids.add(submodule.submodule_id);
      }); 
      this._moduleService.addAllModules(module.module_id, Number(this.designation_id), this.subid, this.school_id).subscribe(
        (response) => {
          if (response && response.submodule_ids !== "") {
            var arr = response.submodule_ids.split(','); 
            arr.forEach((sm: Number) => {
              this.subids.add((Number)(sm));
            });
          } 
        },
        (error) => {
          console.log("SomeThing went Wrong: ",error);
        }
      );
       
    } else { 
      
      this._moduleService.deleteAllModule(module.module_id, Number(this.designation_id), this.school_id).subscribe(
        (response) => { 

          // Delete submodule_ids from the Set for each submodule
          module.subModules.forEach((submodule: any) => {
            this.subids.delete(submodule.submodule_id);  
          });

          // Check if childSubModules exist and get submodule_ids
          module.subModules.forEach((submodule: any) => {
            if (submodule.childSubModules && submodule.childSubModules.length > 0) {
              submodule.childSubModules.forEach((child: any) => { 
                this.subids.delete(child.submodule_id); 
              });
            }
          });
        },
        (error) => {
          console.error("Error during deletion: ", error);
        }
      );

      //module.subModules.forEach((submodule: any) => { 
      //  this._moduleService.deleteModule(module.module_id, submodule.submodule_id, Number(this.designation_id)).subscribe(
      //    (response) => {
      //      this.subids.delete(submodule.submodule_id);
      //      //this.designationModules(event.target.value);
      //    },
      //    (error) => {
      //      console.log("Module not deleted..", error);
      //    }
      //  );
      //});
    } 
  } 

 
}
