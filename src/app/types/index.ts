export type User = null | {
  email: string
  uid: string
  displayName: string
}
export type Alert = null | { type: 'success' | 'error'; message: string }

export type Master = null | {
  socialLinks: { name: string; value: string }[]
  termAndConditions: {
    title: string
    urlAlias: string
    objectName: string
    showTitle: boolean
    showUpdate: boolean
  }[]
}

export type Popup = {
  style?: {}
  children?: Function
  className?: string
}

export type Toast = {
  type?: ToastType
  title: string
  description: string
  onClose?: Function
}

export type LanguageType = '' | 'shn2eng' | 'eng2shn' | 'shn2bur' | 'bur2shn' | 'shn2shn' | 'pli2shn' | 'tha2shn'
export type ToastType = 'success' | 'error'

export type Links = { links: LinksItem[] }

export type LinksItem = { name: string; href?: string }

export type ElementState = '' | 'loading' | 'disable' | 'error'

export type AnnouncementState = '' | 'yes'
