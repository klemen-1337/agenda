import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path : '',
        loadComponent: () => import('./components/bucket-list/bucket-list.component')
            .then(m => m.BucketListComponent)
    },
    {
        path : 'bucket-details/:id',
        loadComponent: () => import('./components/bucket-details/bucket-details.component')
            .then(m => m.BucketDetailsComponent)
    }

];
