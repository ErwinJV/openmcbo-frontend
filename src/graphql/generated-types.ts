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
  DateTime: { input: any; output: any; }
  JSONObject: { input: any; output: any; }
};

export type Attribute = {
  /** Attribute's creation date in ISO format. Example: "2023-01-01T00:00:00.000Z" */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** Attribute data type */
  dataType: Scalars['String']['output'];
  /** Attribute ID (UUID) */
  id: Scalars['ID']['output'];
  /** Attribute name */
  name: Scalars['String']['output'];
  /** Subcategory associated with the attribute. Ex: Electronics, Furniture, etc. */
  subcategory: Subcategory;
  /** Subcategory ID (UUID). Example: 123e4567-e89b-12d3-a456-426614174000 */
  subcategoryId: Scalars['ID']['output'];
  /** Attribute's last update date in ISO format. Example: "2023-01-01T00:00:00.000Z" */
  updated_at?: Maybe<Scalars['DateTime']['output']>;
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

export type Brand = {
  /** Brand's creation date in ISO format. Example: "2023-01-01T00:00:00.000Z" */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** The description of the brand */
  description?: Maybe<Scalars['String']['output']>;
  /** The unique identifier of the brand */
  id: Scalars['ID']['output'];
  /** Indicates whether the brand is active or not */
  isActive: Scalars['Boolean']['output'];
  /** The URL of the brand logo */
  logoUrl?: Maybe<Scalars['String']['output']>;
  /** The name of the brand */
  name: Scalars['String']['output'];
  /** The products associated with the brand */
  products?: Maybe<Array<Product>>;
  /** The slug of the brand */
  slug?: Maybe<Scalars['String']['output']>;
  /** Brand's last update date in ISO format. Example: "2023-01-01T00:00:00.000Z" */
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  /** The website of the brand */
  website?: Maybe<Scalars['String']['output']>;
};


export type BrandProductsArgs = {
  pagination?: InputMaybe<PaginationDto>;
};

export type BrandFiltersInput = {
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Category = {
  /** Category's creation date in ISO format. Example: "2023-01-01T00:00:00.000Z" */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** Category ID (UUID) */
  id: Scalars['ID']['output'];
  /** Category name */
  name: Scalars['String']['output'];
  /** Category slug (URL-friendly name) */
  slug: Scalars['String']['output'];
  /** Subcategories of this category */
  subcategory: Array<Subcategory>;
  /** Category's last update date in ISO format. Example: "2023-01-01T00:00:00.000Z" */
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type CreateAttributeInput = {
  /** Data type of the attribute */
  dataType: Scalars['String']['input'];
  /** Example field (placeholder) */
  name: Scalars['String']['input'];
  /** ID of the subcategory this attribute belongs to */
  subcategoryId: Scalars['String']['input'];
};

export type CreateBrandInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  website?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCategoryInput = {
  /** Category name */
  name: Scalars['String']['input'];
};

export type CreateMultiplePropertiesInput = {
  properties: Array<CreatePropertyInput>;
};

export type CreatePermissionInput = {
  action: Scalars['String']['input'];
  resource: Scalars['String']['input'];
  scope: Scalars['String']['input'];
};

export type CreateProductInput = {
  brandId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  details?: InputMaybe<Scalars['JSONObject']['input']>;
  images?: InputMaybe<Array<ProductImageInput>>;
  mainImageUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price?: InputMaybe<Scalars['Float']['input']>;
  priceUnit?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: ProductStatus;
  subcategoryId: Scalars['ID']['input'];
};

export type CreatePropertyInput = {
  /** Area in square meters of the property */
  area: Scalars['Int']['input'];
  /** Property's description. Example: "Apartamento amplio, con 4 habitaciones, comedor, dos banos y una sala, etc.". This field is required | Maximum character length of 420  */
  description: Scalars['String']['input'];
  /** Property place latitude */
  lat: Scalars['Float']['input'];
  /** Property place longitude */
  long: Scalars['Float']['input'];
  /** Property's main picture URL. Example: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg". This value is optional */
  main_picture_url?: InputMaybe<Scalars['String']['input']>;
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
  /** Property's price. Example: "125000.00". This field is required */
  price: Scalars['Float']['input'];
  /** Property's status. Example: "SALE". This field is required */
  status: PropertyStatus;
  /** Property's title, Example: "Apartamento en Buena Vista". This field is required | Maximum character length of 80 */
  title: Scalars['String']['input'];
  /** Property's type. Example: "HOUSE". This field is required */
  type: PropertyType;
};

export type CreateRealtorInput = {
  /** Realtor work email */
  email: Scalars['String']['input'];
  /** Realtor is active */
  is_active: Scalars['Boolean']['input'];
  /** Realtor Last Name */
  last_name: Scalars['String']['input'];
  /** Realtor Name */
  name: Scalars['String']['input'];
  /** Real state agency where realtor works */
  real_state: Scalars['String']['input'];
  /** Realtor phone number */
  tel: Scalars['String']['input'];
};

export type CreateRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  permissionIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateSubcategoryInput = {
  /** Subcategory categoryId */
  categoryId: Scalars['String']['input'];
  /** Subcategory name */
  name: Scalars['String']['input'];
};

export type CreateTenantInput = {
  /** URL of the tenant logo. Example: "https://example.com/logo.png" */
  logo?: InputMaybe<Scalars['String']['input']>;
  /** Comercial name of the tenant. Example: "EPA" */
  name: Scalars['String']['input'];
  /** Tenant's Website Url */
  website: Scalars['String']['input'];
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
  /** User's profile picture URL. Example: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg". This value is optional */
  profile_picture_url?: InputMaybe<Scalars['String']['input']>;
  realtorId?: InputMaybe<Scalars['String']['input']>;
  /** User's role id (uuid), Example: "c2793525-56c5-4fce-8240-f2d32d9fc695". This field is required */
  roleId?: InputMaybe<Scalars['String']['input']>;
  tenantId?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  addProductImage: Product;
  /** Create a new attribute */
  createAttribute: Attribute;
  createBrand: Brand;
  /** Create a new category */
  createCategory: Category;
  /** Creates a multiple fake properties for development testing */
  createMultipleProperties: Array<Property>;
  createPermission: Permission;
  createProduct: Product;
  /** Create a property by createPropertyInput params, authorization bearer token is required in the header request */
  createProperty: Property;
  createRealtor: Realtor;
  createRole: Role;
  /** Create a new subcategory */
  createSubcategory: Subcategory;
  createTenant: Tenant;
  /** Create a user by createUserInput params, authorization bearer token is required in the header request */
  createUser: User;
  deactivateBrand: Brand;
  deactivateProduct: Product;
  login: AuthResponse;
  /** Remove an attribute */
  removeAttribute: Attribute;
  removeBrand: Scalars['Boolean']['output'];
  /** Remove a category */
  removeCategory: Category;
  removePermission: Permission;
  removeProduct: Scalars['Boolean']['output'];
  removeProductImage: Scalars['Boolean']['output'];
  /** Remove a single property by required id, authorization bearer token is required in the header request */
  removeProperty: Property;
  removeRealtor: Realtor;
  removeRole: Role;
  /** Remove a subcategory */
  removeSubcategory: Subcategory;
  removeTenant: Tenant;
  /** Remove a single user required by a required id (uuid), authorization bearer token is required in the header request */
  removeUser: User;
  /** Update an attribute */
  updateAttribute: Attribute;
  updateBrand: Brand;
  /** Update a category */
  updateCategory: Category;
  updatePermission: Permission;
  updateProduct: Product;
  /** Update a single property by updatePropertyInput params and required id, authorization bearer token is required in the header request */
  updateProperty: PropertyUpdateResponse;
  updateRealtor: Realtor;
  updateRole: Role;
  /** Update a subcategory */
  updateSubcategory: Subcategory;
  updateTenant: Tenant;
  /** Update a single user by updateUserParams and required id (uuid), authorization bearer token is required in the header request */
  updateUser: User;
};


export type MutationAddProductImageArgs = {
  alt?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['ID']['input'];
  sortOrder?: InputMaybe<Scalars['Float']['input']>;
  url: Scalars['String']['input'];
};


export type MutationCreateAttributeArgs = {
  createAttributeInput: CreateAttributeInput;
};


export type MutationCreateBrandArgs = {
  input: CreateBrandInput;
};


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};


export type MutationCreateMultiplePropertiesArgs = {
  input: CreateMultiplePropertiesInput;
};


export type MutationCreatePermissionArgs = {
  createPermissionInput: CreatePermissionInput;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationCreatePropertyArgs = {
  createPropertyInput: CreatePropertyInput;
};


export type MutationCreateRealtorArgs = {
  createRealtorInput: CreateRealtorInput;
};


export type MutationCreateRoleArgs = {
  createRoleInput: CreateRoleInput;
};


export type MutationCreateSubcategoryArgs = {
  createSubcategoryInput: CreateSubcategoryInput;
};


export type MutationCreateTenantArgs = {
  createTenantInput: CreateTenantInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeactivateBrandArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeactivateProductArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  authInput: AuthInput;
};


export type MutationRemoveAttributeArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveBrandArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveCategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemovePermissionArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveProductArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveProductImageArgs = {
  imageId: Scalars['ID']['input'];
};


export type MutationRemovePropertyArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveRealtorArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveRoleArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveSubcategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveTenantArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateAttributeArgs = {
  updateAttributeInput: UpdateAttributeInput;
};


export type MutationUpdateBrandArgs = {
  input: UpdateBrandInput;
};


export type MutationUpdateCategoryArgs = {
  updateCategoryInput: UpdateCategoryInput;
};


export type MutationUpdatePermissionArgs = {
  updatePermissionInput: UpdatePermissionInput;
};


export type MutationUpdateProductArgs = {
  input: UpdateProductInput;
};


export type MutationUpdatePropertyArgs = {
  updatePropertyInput: UpdatePropertyInput;
};


export type MutationUpdateRealtorArgs = {
  updateRealtorInput: UpdateRealtorInput;
};


export type MutationUpdateRoleArgs = {
  updateRoleInput: UpdateRoleInput;
};


export type MutationUpdateSubcategoryArgs = {
  updateSubcategoryInput: UpdateSubcategoryInput;
};


export type MutationUpdateTenantArgs = {
  updateTenantInput: UpdateTenantInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type PaginatedAttributes = {
  count: Scalars['Int']['output'];
  items: Array<Maybe<Attribute>>;
  total: Scalars['Int']['output'];
};

export type PaginatedBrands = {
  items: Array<Brand>;
  limit: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedCategories = {
  count: Scalars['Int']['output'];
  items: Array<Maybe<Category>>;
  total: Scalars['Int']['output'];
};

export type PaginatedPermissions = {
  count: Scalars['Int']['output'];
  items: Array<Maybe<Permission>>;
  total: Scalars['Int']['output'];
};

export type PaginatedProducts = {
  items: Array<Product>;
  limit: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedRealtors = {
  count: Scalars['Int']['output'];
  items: Array<Maybe<Realtor>>;
  total: Scalars['Int']['output'];
};

export type PaginatedRoles = {
  count: Scalars['Int']['output'];
  items: Array<Maybe<Role>>;
  total: Scalars['Int']['output'];
};

export type PaginatedSubcategory = {
  count: Scalars['Int']['output'];
  items: Array<Maybe<Subcategory>>;
  total: Scalars['Int']['output'];
};

export type PaginatedTenants = {
  count: Scalars['Int']['output'];
  items: Array<Maybe<Tenant>>;
  total: Scalars['Int']['output'];
};

export type PaginationDto = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
};

export type Permission = {
  /** The action of the permission. Example: "create", "read", "update", "delete", "manage" */
  action: Scalars['String']['output'];
  /** Permission's date creation in ISO format. Example: "2023-01-01T00:00:00.000Z" */
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  /** The resource of the permission. Example: "inmuebles", "productos", "users" */
  resource: Scalars['String']['output'];
  roles: Role;
  /** The scope of the permission. Example: "own", "all" */
  scope: Scalars['String']['output'];
  /** Permission's last update date in ISO format. Example: "2023-01-01T00:00:00.000Z" */
  updated_at: Scalars['DateTime']['output'];
};

export type Product = {
  brand: Brand;
  /** Brand ID (UUID) */
  brandId: Scalars['String']['output'];
  /** Product's creation date in ISO format. Example: "2023-01-01T00:00:00.000Z" */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  details?: Maybe<Scalars['JSONObject']['output']>;
  id: Scalars['ID']['output'];
  images?: Maybe<Array<ProductImage>>;
  mainImageUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  price?: Maybe<Scalars['Float']['output']>;
  priceUnit?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  status: ProductStatus;
  /** Subcategory associated with the product */
  subcategory: Subcategory;
  /** Subcategory ID (UUID) */
  subcategoryId: Scalars['String']['output'];
  /** Tenant associated with the product */
  tenant: Tenant;
  /** Tenant ID */
  tenantId: Scalars['String']['output'];
  /** Product's last update date in ISO format. Example: "2023-01-01T00:00:00.000Z" */
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type ProductFiltersInput = {
  brandId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<ProductStatus>;
};

export type ProductImage = {
  alt?: Maybe<Scalars['String']['output']>;
  /** ProductImage's creation date in ISO format. Example: "2023-01-01T00:00:00.000Z" */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  filename?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  product: Product;
  /** Product ID (UUID) */
  productId: Scalars['String']['output'];
  size: Scalars['Float']['output'];
  sortOrder?: Maybe<Scalars['Float']['output']>;
  /** ProductImage's last update date in ISO format. Example: "2023-01-01T00:00:00.000Z" */
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  url: Scalars['String']['output'];
};

export type ProductImageInput = {
  alt?: InputMaybe<Scalars['String']['input']>;
  filename?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
  url: Scalars['String']['input'];
};

export enum ProductStatus {
  Active = 'ACTIVE',
  Discontinued = 'DISCONTINUED',
  Inactive = 'INACTIVE',
  OutOfStock = 'OUT_OF_STOCK'
}

export type PropertiesDataResponse = {
  properties: Array<Property>;
  total: Scalars['Int']['output'];
};

export type Property = {
  /** Area in square meters of the property */
  area: Scalars['Int']['output'];
  /** Property's creation date in ISO format. Example: "2023-01-01T00:00:00.000Z" */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** Property's description. Max character length: 125, Example: "Apartamento amplio, con 4 habitaciones, comedor, dos banos y una sala, etc."  */
  description: Scalars['String']['output'];
  /** Property's id (uuid). Example: "f7d27564-939c-42f2-90f8-ee8eece4bc8c" */
  id: Scalars['ID']['output'];
  images?: Maybe<Array<PropertyImage>>;
  images360?: Maybe<Array<PropertyImage360>>;
  /** Property's latitude (Google Maps). Example: "41.40338" */
  lat?: Maybe<Scalars['Float']['output']>;
  /** Property's longitude (Google Maps). Example: "2.17403" */
  long?: Maybe<Scalars['Float']['output']>;
  /** Property's main picture URL. Example: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg". This value is optional */
  main_picture_url?: Maybe<Scalars['String']['output']>;
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
  /** Property's price. Example: "125000.00" */
  price: Scalars['Float']['output'];
  /** Property's Realtor who belongs */
  realtor: Realtor;
  /** Realtor's user id creator. Example: "1b8800a2-2385-403a-893b-3eba76ba4608"  */
  realtorId: Scalars['String']['output'];
  /** Property's slug, generate based of the title property. Max character length: 25, Example: "Apartamento-en-Buena-Vista" */
  slug: Scalars['String']['output'];
  /** Property's status. Example: "SALE" */
  status: PropertyStatus;
  /** Property's title. Max character length: 25, Example: "Apartamento en Buena Vista. " */
  title: Scalars['String']['output'];
  /** Property's type. Example: "HOUSE" */
  type: PropertyType;
  /** Property's last update date in ISO format. Example: "2023-01-01T00:00:00.000Z" */
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  /** User creator of the property */
  userId: Scalars['String']['output'];
  videos?: Maybe<Array<PropertyVideo>>;
  virtualTour?: Maybe<Array<PropertyVirtualTour>>;
};

export type PropertyFilterInput = {
  max_area?: InputMaybe<Scalars['Float']['input']>;
  min_area?: InputMaybe<Scalars['Float']['input']>;
  num_bathrooms?: InputMaybe<Scalars['Int']['input']>;
  num_bedrooms?: InputMaybe<Scalars['Int']['input']>;
  num_parking_lot?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<PropertyStatus>;
  term?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<PropertyType>;
};

export type PropertyImage = {
  alt_url: Scalars['String']['output'];
  fileName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  property: Property;
  propertyId: Scalars['String']['output'];
  size: Scalars['Float']['output'];
  storage_alt_url: Scalars['String']['output'];
  storage_url: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type PropertyImage360 = {
  alt_url: Scalars['String']['output'];
  fileName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  property: Property;
  /** File size in bytes */
  size: Scalars['Float']['output'];
  storage_alt_url: Scalars['String']['output'];
  storage_url: Scalars['String']['output'];
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

export type PropertyVideo = {
  alt_url: Scalars['String']['output'];
  fileName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  property: Property;
  size: Scalars['Float']['output'];
  storage_alt_url: Scalars['String']['output'];
  storage_url: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type PropertyVirtualTour = {
  id: Scalars['ID']['output'];
  property: Property;
  url: Scalars['String']['output'];
};

export type Query = {
  /** Get an attribute by ID */
  attribute: Attribute;
  /** Get all attributes */
  attributes: PaginatedAttributes;
  brand: Brand;
  brandBySlug: Brand;
  brands: PaginatedBrands;
  /** Get all categories */
  categories: PaginatedCategories;
  /** Get a category by ID */
  category: Category;
  filterProperties: PropertiesDataResponse;
  /** Find properties nearby a location by providing lat, long and radius in km */
  nearbyProperties: Array<Property>;
  permission: Permission;
  permissions: PaginatedPermissions;
  product: Product;
  productBySlug: Product;
  products: PaginatedProducts;
  productsByBrand: PaginatedProducts;
  /** Returns a paginated list of properties */
  properties: PropertiesDataResponse;
  /** Returns a paginated list of properties  */
  propertiesDashboard: PropertiesDataResponse;
  /** Return a single property by required term (property id) */
  property: Property;
  /** Return a single property by required slug (property id or slug) */
  propertyBySlug?: Maybe<Property>;
  realtor: Realtor;
  realtors: PaginatedRealtors;
  role: Role;
  roles: PaginatedRoles;
  /** Search properties by term (title, description, place) and pagination params */
  searchProperties: PropertiesDataResponse;
  /** Get a subcategory by ID */
  subcategory: Subcategory;
  tenant: Tenant;
  tenants: PaginatedTenants;
  /** Return a single user required by id (uuid), authorization bearer token is required in the header request */
  user: User;
  /** Return a paginated list of users, authorization bearer token is required in the header request */
  users: UsersDataResponse;
  verifyAuthToken: AuthVerificationResponse;
};


export type QueryAttributeArgs = {
  id: Scalars['String']['input'];
};


export type QueryAttributesArgs = {
  paginationDto: PaginationDto;
};


export type QueryBrandArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBrandBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryBrandsArgs = {
  filters?: InputMaybe<BrandFiltersInput>;
  pagination?: InputMaybe<PaginationDto>;
};


export type QueryCategoriesArgs = {
  paginationDto: PaginationDto;
};


export type QueryCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFilterPropertiesArgs = {
  filters?: InputMaybe<PropertyFilterInput>;
  paginationDto: PaginationDto;
};


export type QueryNearbyPropertiesArgs = {
  lat: Scalars['Float']['input'];
  long: Scalars['Float']['input'];
  radius: Scalars['Float']['input'];
  slug: Scalars['String']['input'];
};


export type QueryPermissionArgs = {
  id: Scalars['String']['input'];
};


export type QueryPermissionsArgs = {
  paginationDto: PaginationDto;
};


export type QueryProductArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProductBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryProductsArgs = {
  filters?: InputMaybe<ProductFiltersInput>;
  pagination?: InputMaybe<PaginationDto>;
};


export type QueryProductsByBrandArgs = {
  brandId: Scalars['ID']['input'];
  pagination?: InputMaybe<PaginationDto>;
};


export type QueryPropertiesArgs = {
  paginationDto: PaginationDto;
};


export type QueryPropertiesDashboardArgs = {
  paginationDto: PaginationDto;
};


export type QueryPropertyArgs = {
  term: Scalars['String']['input'];
};


export type QueryPropertyBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryRealtorArgs = {
  id: Scalars['String']['input'];
};


export type QueryRealtorsArgs = {
  paginationDto: PaginationDto;
};


export type QueryRoleArgs = {
  id: Scalars['String']['input'];
};


export type QueryRolesArgs = {
  paginationDto: PaginationDto;
};


export type QuerySearchPropertiesArgs = {
  paginationDto: PaginationDto;
  term: Scalars['String']['input'];
};


export type QuerySubcategoryArgs = {
  id: Scalars['String']['input'];
};


export type QueryTenantArgs = {
  id: Scalars['String']['input'];
};


export type QueryTenantsArgs = {
  paginationDto: PaginationDto;
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  paginationDto: PaginationDto;
};

export type Realtor = {
  /** Realtor's date creation in ISO format. Example: "2023-01-01T00:00:00.000Z" */
  created_at: Scalars['DateTime']['output'];
  /** Realtor work email */
  email: Scalars['String']['output'];
  /** Realtor ID (UUID) */
  id: Scalars['String']['output'];
  /** Realtor is active */
  is_active: Scalars['Boolean']['output'];
  /** Realtor Last Name */
  last_name: Scalars['String']['output'];
  /** Realtor Name */
  name: Scalars['String']['output'];
  /** Array that contains Properties relative to the realtor. Example: [{id: "c2793525-56c5-4fce-8240-f2d32d9fc695", name: "Property 1", ...}, {id: "c2793525-56c5-4fce-8240-f2d32d9fc695", name: "Property 2", ...}] */
  properties?: Maybe<Array<Property>>;
  /** The Real State agency where realtor works */
  real_state: Scalars['String']['output'];
  /** Realtor phone number */
  tel: Scalars['String']['output'];
  /** Realtor's last update date in ISO format. Example: "2023-01-01T00:00:00.000Z" */
  updated_at: Scalars['DateTime']['output'];
  /** The users associated with the realtor. */
  users: Array<User>;
};

export type Role = {
  /** Role's date creation in ISO format. Example: "2023-01-01T00:00:00.000Z" */
  created_at: Scalars['DateTime']['output'];
  /** The description of the role. Example: "Administrator role", "Agent role", "Provider role" */
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** The name of the role. Example: "admin", "agente", "proveedor" */
  name: Scalars['String']['output'];
  /** The permissions associated with the role. */
  permissions: Array<Permission>;
  /** Role's last update date in ISO format. Example: "2023-01-01T00:00:00.000Z" */
  updated_at: Scalars['DateTime']['output'];
};

export type Subcategory = {
  /** Attributes associated with the subcategory */
  attributes: Array<Attribute>;
  category: Category;
  categoryId: Scalars['ID']['output'];
  /** Subcategory's creation date in ISO format. Example: "2023-01-01T00:00:00.000Z" */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  /** Subcategory ID (UUID) */
  id: Scalars['ID']['output'];
  /** Subcategory name */
  name: Scalars['String']['output'];
  /** Products associated with the subcategory */
  products: Array<Product>;
  /** Subcategory slug */
  slug: Scalars['String']['output'];
  /** Subcategory's last update date in ISO format. Example: "2023-01-01T00:00:00.000Z" */
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type Tenant = {
  /** Tenant's creation date in ISO format. Example: "2023-01-01T00:00:00.000Z" */
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  /** Name of the tenant */
  name: Scalars['String']['output'];
  /** The products associated with the tenant. */
  products: Array<Product>;
  /** Tenant's last update date in ISO format. Example: "2023-01-01T00:00:00.000Z" */
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  /** The users associated with the tenant. */
  users: Array<User>;
  website?: Maybe<Scalars['String']['output']>;
};

export type UpdateAttributeInput = {
  /** Data type of the attribute */
  dataType?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  /** Example field (placeholder) */
  name?: InputMaybe<Scalars['String']['input']>;
  /** ID of the subcategory this attribute belongs to */
  subcategoryId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBrandInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCategoryInput = {
  /** Category ID */
  id: Scalars['String']['input'];
  /** Category name */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePermissionInput = {
  action?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  resource?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductInput = {
  brandId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  details?: InputMaybe<Scalars['JSONObject']['input']>;
  id: Scalars['ID']['input'];
  images?: InputMaybe<Array<ProductImageInput>>;
  mainImageUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  priceUnit?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ProductStatus>;
  subcategoryId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdatePropertyInput = {
  /** Area in square meters of the property */
  area?: InputMaybe<Scalars['Int']['input']>;
  /** Property's description. Example: "Apartamento amplio, con 4 habitaciones, comedor, dos banos y una sala, etc.". This field is required | Maximum character length of 420  */
  description?: InputMaybe<Scalars['String']['input']>;
  /** User's id (uuid), Example: "c2793525-56c5-4fce-8240-f2d32d9fc695". This field is required */
  id: Scalars['String']['input'];
  /** Property place latitude */
  lat?: InputMaybe<Scalars['Float']['input']>;
  /** Property place longitude */
  long?: InputMaybe<Scalars['Float']['input']>;
  /** Property's main picture URL. Example: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg". This value is optional */
  main_picture_url?: InputMaybe<Scalars['String']['input']>;
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
  /** Property's price. Example: "125000.00". This field is required */
  price?: InputMaybe<Scalars['Float']['input']>;
  /** Property's status. Example: "SALE". This field is required */
  status?: InputMaybe<PropertyStatus>;
  /** Property's title, Example: "Apartamento en Buena Vista". This field is required | Maximum character length of 80 */
  title?: InputMaybe<Scalars['String']['input']>;
  /** Property's type. Example: "HOUSE". This field is required */
  type?: InputMaybe<PropertyType>;
};

export type UpdateRealtorInput = {
  /** Realtor work email */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Realtor ID (UUID) */
  id: Scalars['String']['input'];
  /** Realtor is active */
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  /** Realtor Last Name */
  last_name?: InputMaybe<Scalars['String']['input']>;
  /** Realtor Name */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Real state agency where realtor works */
  real_state?: InputMaybe<Scalars['String']['input']>;
  /** Realtor phone number */
  tel?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  /** The unique identifier of the role to update */
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  permissionIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateSubcategoryInput = {
  /** Subcategory categoryId */
  categoryId?: InputMaybe<Scalars['String']['input']>;
  /** Category ID (UUID) */
  id: Scalars['String']['input'];
  /** Subcategory name */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTenantInput = {
  /** The unique identifier of the tenant to update */
  id: Scalars['String']['input'];
  /** URL of the tenant logo. Example: "https://example.com/logo.png" */
  logo?: InputMaybe<Scalars['String']['input']>;
  /** Comercial name of the tenant. Example: "EPA" */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Tenant's Website Url */
  website?: InputMaybe<Scalars['String']['input']>;
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
  /** User's profile picture URL. Example: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg". This value is optional */
  profile_picture_url?: InputMaybe<Scalars['String']['input']>;
  realtorId?: InputMaybe<Scalars['String']['input']>;
  /** User's role id (uuid), Example: "c2793525-56c5-4fce-8240-f2d32d9fc695". This field is required */
  roleId?: InputMaybe<Scalars['String']['input']>;
  tenantId?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  /** Users's date creation in ISO format. Example: "2023-01-01T00:00:00.000Z" */
  created_at: Scalars['DateTime']['output'];
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
  /** User's profile picture URL. Example: "https://cloudflare.com/profile-picture.jpg" */
  profile_picture_url?: Maybe<Scalars['String']['output']>;
  realtor?: Maybe<Realtor>;
  /** User's realtor id (uuid). Example: "c2793525-56c5-4fce-8240-f2d32d9fc695" */
  realtorId?: Maybe<Scalars['String']['output']>;
  role: Role;
  /** User's role id (uuid). Example: "c2793525-56c5-4fce-8240-f2d32d9fc695" */
  roleId: Scalars['String']['output'];
  tenant?: Maybe<Tenant>;
  /** User's tenant id (uuid). Example: "c2793525-56c5-4fce-8240-f2d32d9fc695" */
  tenantId?: Maybe<Scalars['String']['output']>;
  /** User's last update date in ISO format. Example: "2023-01-01T00:00:00.000Z" */
  updated_at: Scalars['DateTime']['output'];
};

export type UsersDataResponse = {
  /** Total users registered in the database, this data is useful for pagination */
  total: Scalars['Int']['output'];
  /** Users, paginated by default in 10 */
  users: Array<User>;
};

export type GetPropertiesQueryVariables = Exact<{
  paginationDto: PaginationDto;
}>;


export type GetPropertiesQuery = { properties: { total: number, properties: Array<{ id: string, title: string, slug: string, status: PropertyStatus, type: PropertyType, description: string, place: string, lat?: number | null, long?: number | null, num_bathrooms?: number | null, num_bedrooms?: number | null, num_pools?: number | null, num_parking_lot?: number | null, created_at?: any | null, updated_at?: any | null, images?: Array<{ id: string, url: string }> | null }> } };

export type GetPropertyQueryVariables = Exact<{
  term: Scalars['String']['input'];
}>;


export type GetPropertyQuery = { property: { id: string, title: string, description: string, type: PropertyType, status: PropertyStatus, place: string, long?: number | null, lat?: number | null, num_bathrooms?: number | null, num_bedrooms?: number | null, num_parking_lot?: number | null } };
