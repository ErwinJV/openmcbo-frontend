export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthInput = {
  /** User's email, Example: "example@email.com". This field is required | Maximum character length of 25 | Must be unique */
  email: Scalars['String']['input'];
  /** User's password, Example: "Ghw~j'#>£F|A7FN=OS:6=/q27". This field is required | Maximum character length of 40 */
  password: Scalars['String']['input'];
};

export type AuthResponse = {
  /** Bearer token response, add this in your header request for several requests */
  access_token: Scalars['String']['output'];
};

export type AuthVerificationResponse = {
  verification: Scalars['Boolean']['output'];
};

export type CreateMultiplePropertiesInput = {
  properties: Array<CreatePropertyInput>;
};

export type CreatePropertyInput = {
  /** Property's description. Example: "Apartamento amplio, con 4 habitaciones, comedor, dos banos y una sala, etc.". This field is required | Maximum character length of 420  */
  description: Scalars['String']['input'];
  /** Property's latitude (Google Maps). Example: "41.40338" */
  lat?: InputMaybe<Scalars['Float']['input']>;
  /** Property's longitude (Google Maps). Example: "2.17403" */
  long?: InputMaybe<Scalars['Float']['input']>;
  /** Property's total bathrooms. Example: "2" */
  num_bathrooms?: InputMaybe<Scalars['Int']['input']>;
  /** Property's total bedrooms. Example: "4" */
  num_bedrooms?: InputMaybe<Scalars['Int']['input']>;
  /** Property's total parkings lot. Example: "2" */
  num_parking_lot?: InputMaybe<Scalars['Int']['input']>;
  /** Property's total pools. Example: "1" */
  num_pools?: InputMaybe<Scalars['Int']['input']>;
  /** Property's place. Example: "Av. Bella Vista Maracaibo, Zulia". This field is required | Maximum character length of 125 */
  place: Scalars['String']['input'];
  /** Property's status. Example: "SALE". This field is required */
  status: PropertyStatus;
  /** Property's title, Example: "Apartamento en Buena Vista". This field is required | Maximum character length of 80 */
  title: Scalars['String']['input'];
  /** Property's type. Example: "HOUSE". This field is required */
  type: PropertyType;
};

export type CreateUserInput = {
  /** User's email, Example: "example@email.com". This field is required | Maximum character length of 25 | Must be unique */
  email: Scalars['String']['input'];
  /** User's last name, Example: "Walker". This field is required | Maximum character length of 25 */
  last_name: Scalars['String']['input'];
  /** User's name, Example: "John". This field is required | Maximum character length of 25  */
  name: Scalars['String']['input'];
  /** User's password, Example: "Ghw~j'#>£F|A7FN=OS:6=/q27". This field is required | Maximum character length of 40 */
  password: Scalars['String']['input'];
  /** User's roles, example: "['ADMIN',"USER']". This value is optional | If no value is provided, its default value will be "['USER']" */
  roles?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Mutation = {
  /** Creates a multiple fake properties for development testing */
  createMultipleProperties: Array<Property>;
  /** Create a property by createPropertyInput params, authorization bearer token is required in the header request */
  createProperty: Property;
  /** Create a user by createUserInput params, authorization bearer token is required in the header request */
  createUser: User;
  login: AuthResponse;
  /** Remove a single property by required id, authorization bearer token is required in the header request */
  removeProperty: Property;
  /** Remove a single user required by a required id (uuid), authorization bearer token is required in the header request */
  removeUser: User;
  /** Update a single property by updatePropertyInput params and required id, authorization bearer token is required in the header request */
  updateProperty: PropertyUpdateResponse;
  /** Update a single user by updateUserParams and required id (uuid), authorization bearer token is required in the header request */
  updateUser: UserUpdateResponse;
};


export type MutationCreateMultiplePropertiesArgs = {
  input: CreateMultiplePropertiesInput;
};


export type MutationCreatePropertyArgs = {
  createPropertyInput: CreatePropertyInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationLoginArgs = {
  authInput: AuthInput;
};


export type MutationRemovePropertyArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdatePropertyArgs = {
  updatePropertyInput: UpdatePropertyInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type PaginationDto = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
};

export type PropertiesDataResponse = {
  properties: Array<Property>;
  total: Scalars['Int']['output'];
};

export type Property = {
  /** Property's date creation in epoch format (milliseconds) by Date.now(). Example: "1519211809934" */
  created_at?: Maybe<Scalars['Float']['output']>;
  /** Property's description. Max character length: 125, Example: "Apartamento amplio, con 4 habitaciones, comedor, dos banos y una sala, etc."  */
  description: Scalars['String']['output'];
  /** Property's id (uuid). Example: "f7d27564-939c-42f2-90f8-ee8eece4bc8c" */
  id: Scalars['ID']['output'];
  images?: Maybe<Array<PropertyImage>>;
  /** Property's latitude (Google Maps). Example: "41.40338" */
  lat?: Maybe<Scalars['Float']['output']>;
  /** Property's longitude (Google Maps). Example: "2.17403" */
  long?: Maybe<Scalars['Float']['output']>;
  /** Property's total bathrooms. Example: "2" */
  num_bathrooms?: Maybe<Scalars['Int']['output']>;
  /** Property's total bedrooms. Example: "4" */
  num_bedrooms?: Maybe<Scalars['Int']['output']>;
  /** Property's total parkings lot. Example: "2" */
  num_parking_lot?: Maybe<Scalars['Int']['output']>;
  /** Property's total pools. Example: "1" */
  num_pools?: Maybe<Scalars['Int']['output']>;
  /** Property's place. Example: "Av. Bella Vista Maracaibo, Zulia' */
  place: Scalars['String']['output'];
  /** Property's slug, generate based of the title property. Max character length: 25, Example: "Apartamento-en-Buena-Vista" */
  slug: Scalars['String']['output'];
  /** Property's status. Example: "SALE" */
  status: PropertyStatus;
  /** Property's title. Max character length: 25, Example: "Apartamento en Buena Vista. " */
  title: Scalars['String']['output'];
  /** Property's type. Example: "HOUSE" */
  type: PropertyType;
  /** Property's last update date in epoch format (milliseconds) by Date.now() method. Example: "1519211809934" */
  updated_at?: Maybe<Scalars['Float']['output']>;
  /** Property's user creator */
  user: User;
  /** Property's user id creator. Example: "1b8800a2-2385-403a-893b-3eba76ba4608"  */
  userId: Scalars['String']['output'];
};

export type PropertyImage = {
  id: Scalars['ID']['output'];
  property: Property;
  url: Scalars['String']['output'];
};

/** Status of property */
export enum PropertyStatus {
  Rent = 'RENT',
  Sale = 'SALE'
}

/** Type of property */
export enum PropertyType {
  Apartment = 'APARTMENT',
  House = 'HOUSE'
}

export type PropertyUpdateResponse = {
  affected?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  /** Returns a paginated list of properties */
  properties: PropertiesDataResponse;
  /** Return a single property by required term (property id or slug) */
  property: Property;
  /** Return a single user required by id (uuid), authorization bearer token is required in the header request */
  user: User;
  /** Return a paginated list of users, authorization bearer token is required in the header request */
  users: UsersDataResponse;
  verifyAuthToken: AuthVerificationResponse;
};


export type QueryPropertiesArgs = {
  paginationDto: PaginationDto;
};


export type QueryPropertyArgs = {
  term: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  paginationDto: PaginationDto;
};

export type UpdatePropertyInput = {
  /** Property's description. Example: "Apartamento amplio, con 4 habitaciones, comedor, dos banos y una sala, etc.". This field is required | Maximum character length of 420  */
  description?: InputMaybe<Scalars['String']['input']>;
  /** User's id (uuid), Example: "c2793525-56c5-4fce-8240-f2d32d9fc695". This field is required */
  id: Scalars['String']['input'];
  /** Property's latitude (Google Maps). Example: "41.40338" */
  lat?: InputMaybe<Scalars['Float']['input']>;
  /** Property's longitude (Google Maps). Example: "2.17403" */
  long?: InputMaybe<Scalars['Float']['input']>;
  /** Property's total bathrooms. Example: "2" */
  num_bathrooms?: InputMaybe<Scalars['Int']['input']>;
  /** Property's total bedrooms. Example: "4" */
  num_bedrooms?: InputMaybe<Scalars['Int']['input']>;
  /** Property's total parkings lot. Example: "2" */
  num_parking_lot?: InputMaybe<Scalars['Int']['input']>;
  /** Property's total pools. Example: "1" */
  num_pools?: InputMaybe<Scalars['Int']['input']>;
  /** Property's place. Example: "Av. Bella Vista Maracaibo, Zulia". This field is required | Maximum character length of 125 */
  place?: InputMaybe<Scalars['String']['input']>;
  /** Property's status. Example: "SALE". This field is required */
  status?: InputMaybe<PropertyStatus>;
  /** Property's title, Example: "Apartamento en Buena Vista". This field is required | Maximum character length of 80 */
  title?: InputMaybe<Scalars['String']['input']>;
  /** Property's type. Example: "HOUSE". This field is required */
  type?: InputMaybe<PropertyType>;
};

export type UpdateUserInput = {
  /** User's email, Example: "example@email.com". This field is required | Maximum character length of 25 | Must be unique */
  email?: InputMaybe<Scalars['String']['input']>;
  /** User's id (uuid), Example: "c2793525-56c5-4fce-8240-f2d32d9fc695". This field is required */
  id: Scalars['String']['input'];
  /** User's last name, Example: "Walker". This field is required | Maximum character length of 25 */
  last_name?: InputMaybe<Scalars['String']['input']>;
  /** User's name, Example: "John". This field is required | Maximum character length of 25  */
  name?: InputMaybe<Scalars['String']['input']>;
  /** User's password, Example: "Ghw~j'#>£F|A7FN=OS:6=/q27". This field is required | Maximum character length of 40 */
  password?: InputMaybe<Scalars['String']['input']>;
  /** User's roles, example: "['ADMIN',"USER']". This value is optional | If no value is provided, its default value will be "['USER']" */
  roles?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type User = {
  /** Users's date creation in epoch format (milliseconds) by Date.now(). Example: "1519211809934" */
  created_at: Scalars['Float']['output'];
  /** User's email, must be unique. Example: "example@email.com" */
  email: Scalars['String']['output'];
  /** User's id (uuid), Example: "c2793525-56c5-4fce-8240-f2d32d9fc695" */
  id: Scalars['String']['output'];
  /** Boolean data that shows whether the user is active or has been suspended." */
  is_active: Scalars['Boolean']['output'];
  /** User's last name: Example: "Walker" */
  last_name: Scalars['String']['output'];
  /** User's name: Example: "John" */
  name: Scalars['String']['output'];
  /** User's password. Must be encrypted */
  password: Scalars['String']['output'];
  /** Array that contains Properties created by the user */
  properties?: Maybe<Array<Property>>;
  /** Contains the user roles: Array  Example: ['USER', 'ADMIN'] */
  roles: Array<Scalars['String']['output']>;
  /** Property's last update date in epoch format (milliseconds) by Date.now(). Example: "1519211809934" */
  updated_at: Scalars['Float']['output'];
};

export type UserUpdateResponse = {
  affected?: Maybe<Scalars['Int']['output']>;
};

export type UsersDataResponse = {
  /** Total users registered in the database, this data is useful for pagination */
  total: Scalars['Int']['output'];
  /** Users, paginated by default in 10 */
  users: Array<User>;
};
