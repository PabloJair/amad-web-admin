import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  projectAppAction,
  projectRequestAction,
  projectResponseAction,
} from './projects.actions';
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
      switchMap((request) =>
        this.service$.listCompany(request.value).pipe(
          map((response) =>
            projectResponseAction.successListCompany({
              value: response.data,
            })
          ),
          catchError((error) => of(projectAppAction.fail(error.error)))
        )
      )
    )
  );

  requestListProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectRequestAction.listProjects),
      switchMap((request) =>
        this.service$.listProject(request.value).pipe(
          map((response) =>
            projectResponseAction.successListProjects({
              value: response.data,
            })
          ),
          catchError((error) => of(projectAppAction.fail(error.error)))
        )
      )
    )
  );

  addProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectRequestAction.add),
      switchMap((request) =>
        this.service$.addProject(request.value).pipe(
          map(() =>
            projectResponseAction.successAdd({
              value: request.value,
            })
          ),
          catchError((error) => of(projectAppAction.fail(error.error)))
        )
      )
    )
  );

  changeStatusCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectRequestAction.changeStatusProject),
      switchMap((request) =>
        this.service$
          .changeStatusCompany(request.idProject, request.status)
          .pipe(
            map((response) =>
              projectResponseAction.successChangeStatusProject({
                success: response.status == Status.OK,
                idProject: request.idProject,
                status: request.status,
              })
            ),
            catchError((error) => of(projectAppAction.fail(error.error)))
          )
      )
    )
  );

  getLanguages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectRequestAction.getLanguages),
      switchMap((request) =>
        this.service$.getLanguages().pipe(
          map((response) =>
            projectResponseAction.successLanguages({
              value: response.data,
            })
          ),
          catchError((error) => of(projectAppAction.fail(error.error)))
        )
      )
    )
  );

  getInformationProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectRequestAction.getInformationProject),
      switchMap((request) =>
        this.service$.getProjectInformation(request.value).pipe(
          map((response) =>
            projectResponseAction.successGetInformation({
              value: response.data,
            })
          ),
          catchError((error) => of(projectAppAction.fail(error.error)))
        )
      )
    )
  );
  createJsonProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectRequestAction.createJsonProject),
      switchMap((request) =>
        this.service$.createJsonProject(request.value).pipe(
          map((response) =>
            projectResponseAction.successCreateJsonProject({
              value: response.data,
            })
          ),
          catchError((error) => of(projectAppAction.fail(error.error)))
        )
      )
    )
  );

  editProject = createEffect(() =>
    this.actions$.pipe(
      ofType(projectRequestAction.edit),
      switchMap((request) =>
        this.service$.putProject(request.idProject, request.value).pipe(
          map((response) =>
            projectResponseAction.successEdit({
              value: request.value,
            })
          ),
          catchError((error) => of(projectAppAction.fail(error.error)))
        )
      )
    )
  );

  updateJsonProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectRequestAction.updateJsonProject),
      switchMap((request) =>
        this.service$.putProjectJson(request.value, request.id).pipe(
          map((response) =>
            projectResponseAction.successUpdateJsonProject({
              value: response.data,
            })
          ),
          catchError((error) => of(projectAppAction.fail(error.error)))
        )
      )
    )
  );
}
