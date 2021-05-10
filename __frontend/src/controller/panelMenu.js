import {__, __n} from '../plugins/i18n'
import router from '../router'

export default {
    items: [
        {
            label: __('Dashboard'),
            icon:'pi pi-fw pi-home',
            // command:() => { router.push('/') },
            items: [
               {
                  label: __('Events'),
                  icon:'pi pi-fw pi-chart-bar',
                  to: '/'
               },
               {
                  label: __('Photos reports'),
                  icon:'pi pi-fw pi-file-pdf',
                  to: '/'
               },
               {
                  label: __('Video tracking'),
                  icon:'pi pi-fw pi-video',
                  to: '/'
               },
               {
                  label: __('Photo gallery'),
                  icon:'pi pi-fw pi-images',
                  to: '/'
               },
               {
                  label: __('Messaging'),
                  icon:'pi pi-fw pi-comments',
                  to: '/'
               },
               {
                  label: __('Android'),
                  icon:'pi pi-fw pi-android',
                  to: '/android'
               }

            ]
        },
        {
           label: __('Applications'),
           icon:'pi pi-fw pi-th-large',
           items: [
              {
                 label: 'New',
                 icon:'pi pi-fw pi-plus',
                 items: [
                    {
                       label: 'Bookmark',
                       icon:'pi pi-fw pi-bookmark',
                       to: '/post'
                    },
                    {
                       label: 'Video',
                       icon:'pi pi-fw pi-video',
                       command:() => router.push('/login')
                    }
                 ]
              },
              {
                 label: 'Delete',
                 icon:'pi pi-fw pi-trash'
              },
              {
                 label: 'Export',
                 icon:'pi pi-fw pi-external-link'
              }
           ]
        },
        {
            label: __('Logout'),
            icon:'pi pi-fw pi-power-off',
            command:() => { router.push('/login') }
        }
    ]
};