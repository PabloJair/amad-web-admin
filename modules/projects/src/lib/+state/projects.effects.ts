import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { projectAppAction, projectRequestAction, projectResponseAction } from './projects.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import * as networkModule from '@amad-web-admin/modules/network';
import { Status } from '@amad-web-admin/modules/network';

@Injectable()
export class ProjectsEffects {
  private actions$ = inject(Actions);
  private service$ = inject(networkModule.ProjectsService);
  requestListCompanies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectRequestAction.listCompany),
      switchMap(request =>
        this.service$.listCompany(request.value).pipe(
          map(response =>
            projectResponseAction.successListCompany({
              value: response.data,
            }),
          ),
          catchError(error => of(projectAppAction.fail(error.error))),
        ),
      ),
    ),
  );

  requestListProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectRequestAction.listProjects),
      switchMap(request =>
        this.service$.listProject(request.value).pipe(
          map(response =>
            projectResponseAction.successListProjects({
              value: response.data,
            }),
          ),
          catchError(error => of(projectAppAction.fail(error.error))),
        ),
      ),
    ),
  );

  addProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectRequestAction.add),
      switchMap(request =>
        this.service$.addProject(request.value).pipe(
          map(() =>

            projectResponseAction.successAdd({
              value: request.value,
            }),
          ),
          catchError(error => of(projectAppAction.fail(error.error))),
        ),
      ),
    ),
  );

  changeStatusCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectRequestAction.changeStatusProject),
      switchMap(request =>
        this.service$.changeStatusCompany(request.idProject,request.status).pipe(
          map(response =>
            projectResponseAction.successChangeStatusProject({
              success:response.status == Status.OK,
              idProject: request.idProject,
              status:request.status
            }),
          ),
          catchError(error => of(projectAppAction.fail(error.error))),
        ),
      ),
    ),)

}
