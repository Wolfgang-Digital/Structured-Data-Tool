import { RouteProps } from 'react-router';
import { SelectOption } from 'schema-form-generator';
import { string } from 'prop-types';

export interface RouteWithSubrouteProps extends Pick<RouteProps, 'path' | 'exact'> {
  key: string
  component?: RouteProps.component & {
    routes: Omit<RouteWithSubrouteProps, 'routes'>[]
  }
  routes?: Omit<RouteWithSubrouteProps, 'routes'>[]
}

export type OrganizationType = (Organization | LocalBusiness) & { url: string }

export type MainEntityType = HowTo | FAQPage | Service

export type Connections = Record<string, { '@id': string }>

export interface Entity {
  uuid: string
  type: SelectOption
}

export interface Thing {
  name: string
  sameAs?: string[]
}

export interface Organization extends Entity {
  name: string
  url: string
  description?: string
  sameAs?: string[]
  image?: string
}

export interface LocalBusiness extends Organization {
  name: string
  openingHoursSpecification?: OpeningHoursSpecification[]
  geoCoordinates?: GeoCoordninates
  address?: PostalAddress
}

export interface WebPage extends Entity {
  parentId: string
  name: string
  url: string
  description?: string
  sameAs?: string[]
  mentions?: Thing[]
  about?: Thing[]
}

export interface MainEntity extends Entity {
  rootId: string
  parentId: string
  name?: string
  sameAs?: string[]
}

export interface HowTo extends MainEntity {
  hasVideo: boolean
  video?: VideoObject
  description?: string
  image?: string
  estimatedCost?: string
  totalTime?: string
  supply: string[]
  tool: string[]
  step: HowToStep[]
}

export interface HowToStep {
  name: string
  image: string
  description: string
  url?: string
  video?: {
    startOffset: number
    endOffset: number
    url: string
  }
}

export interface OpeningHoursSpecification {
  dayOfWeek: SelectOption[]
  times: {
    opens: string
    closes: string
  }
}

export interface GeoCoordninates {
  latitude?: number
  longitude?: number
}

export interface PostalAddress {
  streetAddress: string
  addressLocality: string
  addressCountry: string
  postalCode: string
}

export interface VideoObject {
  name: string
  description?: string
  duration?: string
  dateUploaded: string
  contentUrl?: string
  embedUrl?: string
  thumbnailUrls?: string[]
}

export interface FAQPage extends MainEntity {
  mainEntity: {
    name: string
    acceptedAnswer: string
  }[]
}

export interface AggregateRating {
  ratingValue: number
  ratingCount: number
  bestRating: number
}

export interface Service extends MainEntity {
  description: string
  image?: string
  aggregateRating?: AggregateRating
  hasRating: boolean
}

export interface ItemList extends MainEntity {
  itemType: SelectOption
  itemListElement: Record<string, any>[]
}