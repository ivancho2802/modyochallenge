export interface IEntries {
    meta: IBodyMeta
    fields: IFields
    "show"?:boolean
    "finded"?:boolean,
    "index"?: number
}
export interface IResponseEntries {
    entries: IEntries[]
}

interface IMeta {
    "meta": IBodyMeta
}

interface IBodyMeta {
    "name": string
    "slug": string
    "tags": string[],
    "type": string
    "uuid": string
    "space": string
    "author": any,
    "locale": string
    "excerpt": string
    "private": boolean
    "targets": any[]
    "category": any
    "created_at": string
    "updated_at": string
    "published_at": string
    "version_type": string
    "category_name": any
    "category_slug": any
    "unpublished_at": any
    "available_locales": string[]
}

interface IFields {
    "image": IImages
}

export interface IImages {
    "url": string
    "tags": []
    "uuid": string
    "title": string
    "alt_text": any
    "description": any
    "content_type": string
}