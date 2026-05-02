
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Profile
 * 
 */
export type Profile = $Result.DefaultSelection<Prisma.$ProfilePayload>
/**
 * Model Anime
 * 
 */
export type Anime = $Result.DefaultSelection<Prisma.$AnimePayload>
/**
 * Model Genre
 * 
 */
export type Genre = $Result.DefaultSelection<Prisma.$GenrePayload>
/**
 * Model AnimeGenre
 * 
 */
export type AnimeGenre = $Result.DefaultSelection<Prisma.$AnimeGenrePayload>
/**
 * Model Episode
 * 
 */
export type Episode = $Result.DefaultSelection<Prisma.$EpisodePayload>
/**
 * Model VideoSource
 * 
 */
export type VideoSource = $Result.DefaultSelection<Prisma.$VideoSourcePayload>
/**
 * Model Subtitle
 * 
 */
export type Subtitle = $Result.DefaultSelection<Prisma.$SubtitlePayload>
/**
 * Model WatchHistory
 * 
 */
export type WatchHistory = $Result.DefaultSelection<Prisma.$WatchHistoryPayload>
/**
 * Model Bookmark
 * 
 */
export type Bookmark = $Result.DefaultSelection<Prisma.$BookmarkPayload>
/**
 * Model Comment
 * 
 */
export type Comment = $Result.DefaultSelection<Prisma.$CommentPayload>
/**
 * Model SiteSetting
 * 
 */
export type SiteSetting = $Result.DefaultSelection<Prisma.$SiteSettingPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  superadmin: 'superadmin',
  admin: 'admin',
  editor: 'editor',
  user: 'user'
};

export type Role = (typeof Role)[keyof typeof Role]


export const AnimeStatus: {
  ongoing: 'ongoing',
  completed: 'completed',
  upcoming: 'upcoming',
  hiatus: 'hiatus'
};

export type AnimeStatus = (typeof AnimeStatus)[keyof typeof AnimeStatus]


export const AnimeType: {
  TV: 'TV',
  Movie: 'Movie',
  OVA: 'OVA',
  ONA: 'ONA',
  Special: 'Special'
};

export type AnimeType = (typeof AnimeType)[keyof typeof AnimeType]


export const Season: {
  winter: 'winter',
  spring: 'spring',
  summer: 'summer',
  fall: 'fall'
};

export type Season = (typeof Season)[keyof typeof Season]


export const VideoQuality: {
  p360: 'p360',
  p480: 'p480',
  p720: 'p720',
  p1080: 'p1080'
};

export type VideoQuality = (typeof VideoQuality)[keyof typeof VideoQuality]


export const VideoFormat: {
  hls: 'hls',
  mp4: 'mp4',
  dash: 'dash'
};

export type VideoFormat = (typeof VideoFormat)[keyof typeof VideoFormat]


export const BookmarkStatus: {
  watching: 'watching',
  completed: 'completed',
  plan: 'plan',
  dropped: 'dropped'
};

export type BookmarkStatus = (typeof BookmarkStatus)[keyof typeof BookmarkStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type AnimeStatus = $Enums.AnimeStatus

export const AnimeStatus: typeof $Enums.AnimeStatus

export type AnimeType = $Enums.AnimeType

export const AnimeType: typeof $Enums.AnimeType

export type Season = $Enums.Season

export const Season: typeof $Enums.Season

export type VideoQuality = $Enums.VideoQuality

export const VideoQuality: typeof $Enums.VideoQuality

export type VideoFormat = $Enums.VideoFormat

export const VideoFormat: typeof $Enums.VideoFormat

export type BookmarkStatus = $Enums.BookmarkStatus

export const BookmarkStatus: typeof $Enums.BookmarkStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Profiles
 * const profiles = await prisma.profile.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Profiles
   * const profiles = await prisma.profile.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.anime`: Exposes CRUD operations for the **Anime** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Anime
    * const anime = await prisma.anime.findMany()
    * ```
    */
  get anime(): Prisma.AnimeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.genre`: Exposes CRUD operations for the **Genre** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Genres
    * const genres = await prisma.genre.findMany()
    * ```
    */
  get genre(): Prisma.GenreDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.animeGenre`: Exposes CRUD operations for the **AnimeGenre** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AnimeGenres
    * const animeGenres = await prisma.animeGenre.findMany()
    * ```
    */
  get animeGenre(): Prisma.AnimeGenreDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.episode`: Exposes CRUD operations for the **Episode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Episodes
    * const episodes = await prisma.episode.findMany()
    * ```
    */
  get episode(): Prisma.EpisodeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.videoSource`: Exposes CRUD operations for the **VideoSource** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VideoSources
    * const videoSources = await prisma.videoSource.findMany()
    * ```
    */
  get videoSource(): Prisma.VideoSourceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subtitle`: Exposes CRUD operations for the **Subtitle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subtitles
    * const subtitles = await prisma.subtitle.findMany()
    * ```
    */
  get subtitle(): Prisma.SubtitleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.watchHistory`: Exposes CRUD operations for the **WatchHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WatchHistories
    * const watchHistories = await prisma.watchHistory.findMany()
    * ```
    */
  get watchHistory(): Prisma.WatchHistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bookmark`: Exposes CRUD operations for the **Bookmark** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookmarks
    * const bookmarks = await prisma.bookmark.findMany()
    * ```
    */
  get bookmark(): Prisma.BookmarkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): Prisma.CommentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.siteSetting`: Exposes CRUD operations for the **SiteSetting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SiteSettings
    * const siteSettings = await prisma.siteSetting.findMany()
    * ```
    */
  get siteSetting(): Prisma.SiteSettingDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Profile: 'Profile',
    Anime: 'Anime',
    Genre: 'Genre',
    AnimeGenre: 'AnimeGenre',
    Episode: 'Episode',
    VideoSource: 'VideoSource',
    Subtitle: 'Subtitle',
    WatchHistory: 'WatchHistory',
    Bookmark: 'Bookmark',
    Comment: 'Comment',
    SiteSetting: 'SiteSetting'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "profile" | "anime" | "genre" | "animeGenre" | "episode" | "videoSource" | "subtitle" | "watchHistory" | "bookmark" | "comment" | "siteSetting"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Profile: {
        payload: Prisma.$ProfilePayload<ExtArgs>
        fields: Prisma.ProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findFirst: {
            args: Prisma.ProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          findMany: {
            args: Prisma.ProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          create: {
            args: Prisma.ProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          createMany: {
            args: Prisma.ProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          delete: {
            args: Prisma.ProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          update: {
            args: Prisma.ProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          deleteMany: {
            args: Prisma.ProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>[]
          }
          upsert: {
            args: Prisma.ProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfilePayload>
          }
          aggregate: {
            args: Prisma.ProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfile>
          }
          groupBy: {
            args: Prisma.ProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileCountAggregateOutputType> | number
          }
        }
      }
      Anime: {
        payload: Prisma.$AnimePayload<ExtArgs>
        fields: Prisma.AnimeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnimeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnimeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload>
          }
          findFirst: {
            args: Prisma.AnimeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnimeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload>
          }
          findMany: {
            args: Prisma.AnimeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload>[]
          }
          create: {
            args: Prisma.AnimeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload>
          }
          createMany: {
            args: Prisma.AnimeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnimeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload>[]
          }
          delete: {
            args: Prisma.AnimeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload>
          }
          update: {
            args: Prisma.AnimeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload>
          }
          deleteMany: {
            args: Prisma.AnimeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnimeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnimeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload>[]
          }
          upsert: {
            args: Prisma.AnimeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload>
          }
          aggregate: {
            args: Prisma.AnimeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnime>
          }
          groupBy: {
            args: Prisma.AnimeGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnimeGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnimeCountArgs<ExtArgs>
            result: $Utils.Optional<AnimeCountAggregateOutputType> | number
          }
        }
      }
      Genre: {
        payload: Prisma.$GenrePayload<ExtArgs>
        fields: Prisma.GenreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GenreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GenreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          findFirst: {
            args: Prisma.GenreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GenreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          findMany: {
            args: Prisma.GenreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>[]
          }
          create: {
            args: Prisma.GenreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          createMany: {
            args: Prisma.GenreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GenreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>[]
          }
          delete: {
            args: Prisma.GenreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          update: {
            args: Prisma.GenreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          deleteMany: {
            args: Prisma.GenreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GenreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GenreUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>[]
          }
          upsert: {
            args: Prisma.GenreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          aggregate: {
            args: Prisma.GenreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGenre>
          }
          groupBy: {
            args: Prisma.GenreGroupByArgs<ExtArgs>
            result: $Utils.Optional<GenreGroupByOutputType>[]
          }
          count: {
            args: Prisma.GenreCountArgs<ExtArgs>
            result: $Utils.Optional<GenreCountAggregateOutputType> | number
          }
        }
      }
      AnimeGenre: {
        payload: Prisma.$AnimeGenrePayload<ExtArgs>
        fields: Prisma.AnimeGenreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnimeGenreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimeGenrePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnimeGenreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimeGenrePayload>
          }
          findFirst: {
            args: Prisma.AnimeGenreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimeGenrePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnimeGenreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimeGenrePayload>
          }
          findMany: {
            args: Prisma.AnimeGenreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimeGenrePayload>[]
          }
          create: {
            args: Prisma.AnimeGenreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimeGenrePayload>
          }
          createMany: {
            args: Prisma.AnimeGenreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnimeGenreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimeGenrePayload>[]
          }
          delete: {
            args: Prisma.AnimeGenreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimeGenrePayload>
          }
          update: {
            args: Prisma.AnimeGenreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimeGenrePayload>
          }
          deleteMany: {
            args: Prisma.AnimeGenreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnimeGenreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnimeGenreUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimeGenrePayload>[]
          }
          upsert: {
            args: Prisma.AnimeGenreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimeGenrePayload>
          }
          aggregate: {
            args: Prisma.AnimeGenreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnimeGenre>
          }
          groupBy: {
            args: Prisma.AnimeGenreGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnimeGenreGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnimeGenreCountArgs<ExtArgs>
            result: $Utils.Optional<AnimeGenreCountAggregateOutputType> | number
          }
        }
      }
      Episode: {
        payload: Prisma.$EpisodePayload<ExtArgs>
        fields: Prisma.EpisodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EpisodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EpisodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EpisodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EpisodePayload>
          }
          findFirst: {
            args: Prisma.EpisodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EpisodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EpisodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EpisodePayload>
          }
          findMany: {
            args: Prisma.EpisodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EpisodePayload>[]
          }
          create: {
            args: Prisma.EpisodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EpisodePayload>
          }
          createMany: {
            args: Prisma.EpisodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EpisodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EpisodePayload>[]
          }
          delete: {
            args: Prisma.EpisodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EpisodePayload>
          }
          update: {
            args: Prisma.EpisodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EpisodePayload>
          }
          deleteMany: {
            args: Prisma.EpisodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EpisodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EpisodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EpisodePayload>[]
          }
          upsert: {
            args: Prisma.EpisodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EpisodePayload>
          }
          aggregate: {
            args: Prisma.EpisodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEpisode>
          }
          groupBy: {
            args: Prisma.EpisodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<EpisodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.EpisodeCountArgs<ExtArgs>
            result: $Utils.Optional<EpisodeCountAggregateOutputType> | number
          }
        }
      }
      VideoSource: {
        payload: Prisma.$VideoSourcePayload<ExtArgs>
        fields: Prisma.VideoSourceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VideoSourceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoSourcePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VideoSourceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoSourcePayload>
          }
          findFirst: {
            args: Prisma.VideoSourceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoSourcePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VideoSourceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoSourcePayload>
          }
          findMany: {
            args: Prisma.VideoSourceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoSourcePayload>[]
          }
          create: {
            args: Prisma.VideoSourceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoSourcePayload>
          }
          createMany: {
            args: Prisma.VideoSourceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VideoSourceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoSourcePayload>[]
          }
          delete: {
            args: Prisma.VideoSourceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoSourcePayload>
          }
          update: {
            args: Prisma.VideoSourceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoSourcePayload>
          }
          deleteMany: {
            args: Prisma.VideoSourceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VideoSourceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VideoSourceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoSourcePayload>[]
          }
          upsert: {
            args: Prisma.VideoSourceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoSourcePayload>
          }
          aggregate: {
            args: Prisma.VideoSourceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVideoSource>
          }
          groupBy: {
            args: Prisma.VideoSourceGroupByArgs<ExtArgs>
            result: $Utils.Optional<VideoSourceGroupByOutputType>[]
          }
          count: {
            args: Prisma.VideoSourceCountArgs<ExtArgs>
            result: $Utils.Optional<VideoSourceCountAggregateOutputType> | number
          }
        }
      }
      Subtitle: {
        payload: Prisma.$SubtitlePayload<ExtArgs>
        fields: Prisma.SubtitleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubtitleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtitlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubtitleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtitlePayload>
          }
          findFirst: {
            args: Prisma.SubtitleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtitlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubtitleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtitlePayload>
          }
          findMany: {
            args: Prisma.SubtitleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtitlePayload>[]
          }
          create: {
            args: Prisma.SubtitleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtitlePayload>
          }
          createMany: {
            args: Prisma.SubtitleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubtitleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtitlePayload>[]
          }
          delete: {
            args: Prisma.SubtitleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtitlePayload>
          }
          update: {
            args: Prisma.SubtitleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtitlePayload>
          }
          deleteMany: {
            args: Prisma.SubtitleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubtitleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubtitleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtitlePayload>[]
          }
          upsert: {
            args: Prisma.SubtitleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtitlePayload>
          }
          aggregate: {
            args: Prisma.SubtitleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubtitle>
          }
          groupBy: {
            args: Prisma.SubtitleGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubtitleGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubtitleCountArgs<ExtArgs>
            result: $Utils.Optional<SubtitleCountAggregateOutputType> | number
          }
        }
      }
      WatchHistory: {
        payload: Prisma.$WatchHistoryPayload<ExtArgs>
        fields: Prisma.WatchHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WatchHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WatchHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchHistoryPayload>
          }
          findFirst: {
            args: Prisma.WatchHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WatchHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchHistoryPayload>
          }
          findMany: {
            args: Prisma.WatchHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchHistoryPayload>[]
          }
          create: {
            args: Prisma.WatchHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchHistoryPayload>
          }
          createMany: {
            args: Prisma.WatchHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WatchHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchHistoryPayload>[]
          }
          delete: {
            args: Prisma.WatchHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchHistoryPayload>
          }
          update: {
            args: Prisma.WatchHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchHistoryPayload>
          }
          deleteMany: {
            args: Prisma.WatchHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WatchHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WatchHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchHistoryPayload>[]
          }
          upsert: {
            args: Prisma.WatchHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchHistoryPayload>
          }
          aggregate: {
            args: Prisma.WatchHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWatchHistory>
          }
          groupBy: {
            args: Prisma.WatchHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<WatchHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.WatchHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<WatchHistoryCountAggregateOutputType> | number
          }
        }
      }
      Bookmark: {
        payload: Prisma.$BookmarkPayload<ExtArgs>
        fields: Prisma.BookmarkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookmarkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookmarkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          findFirst: {
            args: Prisma.BookmarkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookmarkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          findMany: {
            args: Prisma.BookmarkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>[]
          }
          create: {
            args: Prisma.BookmarkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          createMany: {
            args: Prisma.BookmarkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookmarkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>[]
          }
          delete: {
            args: Prisma.BookmarkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          update: {
            args: Prisma.BookmarkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          deleteMany: {
            args: Prisma.BookmarkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookmarkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BookmarkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>[]
          }
          upsert: {
            args: Prisma.BookmarkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookmarkPayload>
          }
          aggregate: {
            args: Prisma.BookmarkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBookmark>
          }
          groupBy: {
            args: Prisma.BookmarkGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookmarkGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookmarkCountArgs<ExtArgs>
            result: $Utils.Optional<BookmarkCountAggregateOutputType> | number
          }
        }
      }
      Comment: {
        payload: Prisma.$CommentPayload<ExtArgs>
        fields: Prisma.CommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findFirst: {
            args: Prisma.CommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findMany: {
            args: Prisma.CommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          create: {
            args: Prisma.CommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          createMany: {
            args: Prisma.CommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          delete: {
            args: Prisma.CommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          update: {
            args: Prisma.CommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          deleteMany: {
            args: Prisma.CommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          upsert: {
            args: Prisma.CommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          aggregate: {
            args: Prisma.CommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComment>
          }
          groupBy: {
            args: Prisma.CommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommentCountArgs<ExtArgs>
            result: $Utils.Optional<CommentCountAggregateOutputType> | number
          }
        }
      }
      SiteSetting: {
        payload: Prisma.$SiteSettingPayload<ExtArgs>
        fields: Prisma.SiteSettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SiteSettingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SiteSettingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload>
          }
          findFirst: {
            args: Prisma.SiteSettingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SiteSettingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload>
          }
          findMany: {
            args: Prisma.SiteSettingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload>[]
          }
          create: {
            args: Prisma.SiteSettingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload>
          }
          createMany: {
            args: Prisma.SiteSettingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SiteSettingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload>[]
          }
          delete: {
            args: Prisma.SiteSettingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload>
          }
          update: {
            args: Prisma.SiteSettingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload>
          }
          deleteMany: {
            args: Prisma.SiteSettingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SiteSettingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SiteSettingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload>[]
          }
          upsert: {
            args: Prisma.SiteSettingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload>
          }
          aggregate: {
            args: Prisma.SiteSettingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSiteSetting>
          }
          groupBy: {
            args: Prisma.SiteSettingGroupByArgs<ExtArgs>
            result: $Utils.Optional<SiteSettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.SiteSettingCountArgs<ExtArgs>
            result: $Utils.Optional<SiteSettingCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    profile?: ProfileOmit
    anime?: AnimeOmit
    genre?: GenreOmit
    animeGenre?: AnimeGenreOmit
    episode?: EpisodeOmit
    videoSource?: VideoSourceOmit
    subtitle?: SubtitleOmit
    watchHistory?: WatchHistoryOmit
    bookmark?: BookmarkOmit
    comment?: CommentOmit
    siteSetting?: SiteSettingOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProfileCountOutputType
   */

  export type ProfileCountOutputType = {
    watchHistory: number
    bookmarks: number
    comments: number
  }

  export type ProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    watchHistory?: boolean | ProfileCountOutputTypeCountWatchHistoryArgs
    bookmarks?: boolean | ProfileCountOutputTypeCountBookmarksArgs
    comments?: boolean | ProfileCountOutputTypeCountCommentsArgs
  }

  // Custom InputTypes
  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileCountOutputType
     */
    select?: ProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountWatchHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchHistoryWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountBookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookmarkWhereInput
  }

  /**
   * ProfileCountOutputType without action
   */
  export type ProfileCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }


  /**
   * Count Type AnimeCountOutputType
   */

  export type AnimeCountOutputType = {
    genres: number
    episodes: number
    bookmarks: number
  }

  export type AnimeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    genres?: boolean | AnimeCountOutputTypeCountGenresArgs
    episodes?: boolean | AnimeCountOutputTypeCountEpisodesArgs
    bookmarks?: boolean | AnimeCountOutputTypeCountBookmarksArgs
  }

  // Custom InputTypes
  /**
   * AnimeCountOutputType without action
   */
  export type AnimeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimeCountOutputType
     */
    select?: AnimeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AnimeCountOutputType without action
   */
  export type AnimeCountOutputTypeCountGenresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnimeGenreWhereInput
  }

  /**
   * AnimeCountOutputType without action
   */
  export type AnimeCountOutputTypeCountEpisodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EpisodeWhereInput
  }

  /**
   * AnimeCountOutputType without action
   */
  export type AnimeCountOutputTypeCountBookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookmarkWhereInput
  }


  /**
   * Count Type GenreCountOutputType
   */

  export type GenreCountOutputType = {
    animes: number
  }

  export type GenreCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    animes?: boolean | GenreCountOutputTypeCountAnimesArgs
  }

  // Custom InputTypes
  /**
   * GenreCountOutputType without action
   */
  export type GenreCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GenreCountOutputType
     */
    select?: GenreCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GenreCountOutputType without action
   */
  export type GenreCountOutputTypeCountAnimesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnimeGenreWhereInput
  }


  /**
   * Count Type EpisodeCountOutputType
   */

  export type EpisodeCountOutputType = {
    videoSources: number
    subtitles: number
    watchHistory: number
    comments: number
  }

  export type EpisodeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    videoSources?: boolean | EpisodeCountOutputTypeCountVideoSourcesArgs
    subtitles?: boolean | EpisodeCountOutputTypeCountSubtitlesArgs
    watchHistory?: boolean | EpisodeCountOutputTypeCountWatchHistoryArgs
    comments?: boolean | EpisodeCountOutputTypeCountCommentsArgs
  }

  // Custom InputTypes
  /**
   * EpisodeCountOutputType without action
   */
  export type EpisodeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EpisodeCountOutputType
     */
    select?: EpisodeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EpisodeCountOutputType without action
   */
  export type EpisodeCountOutputTypeCountVideoSourcesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VideoSourceWhereInput
  }

  /**
   * EpisodeCountOutputType without action
   */
  export type EpisodeCountOutputTypeCountSubtitlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubtitleWhereInput
  }

  /**
   * EpisodeCountOutputType without action
   */
  export type EpisodeCountOutputTypeCountWatchHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchHistoryWhereInput
  }

  /**
   * EpisodeCountOutputType without action
   */
  export type EpisodeCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }


  /**
   * Count Type CommentCountOutputType
   */

  export type CommentCountOutputType = {
    replies: number
  }

  export type CommentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    replies?: boolean | CommentCountOutputTypeCountRepliesArgs
  }

  // Custom InputTypes
  /**
   * CommentCountOutputType without action
   */
  export type CommentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentCountOutputType
     */
    select?: CommentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CommentCountOutputType without action
   */
  export type CommentCountOutputTypeCountRepliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Profile
   */

  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileMinAggregateOutputType = {
    id: string | null
    username: string | null
    displayName: string | null
    avatarUrl: string | null
    role: $Enums.Role | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: string | null
    username: string | null
    displayName: string | null
    avatarUrl: string | null
    role: $Enums.Role | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    username: number
    displayName: number
    avatarUrl: number
    role: number
    passwordHash: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProfileMinAggregateInputType = {
    id?: true
    username?: true
    displayName?: true
    avatarUrl?: true
    role?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    username?: true
    displayName?: true
    avatarUrl?: true
    role?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    username?: true
    displayName?: true
    avatarUrl?: true
    role?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profile to aggregate.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type ProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileWhereInput
    orderBy?: ProfileOrderByWithAggregationInput | ProfileOrderByWithAggregationInput[]
    by: ProfileScalarFieldEnum[] | ProfileScalarFieldEnum
    having?: ProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }

  export type ProfileGroupByOutputType = {
    id: string
    username: string
    displayName: string | null
    avatarUrl: string | null
    role: $Enums.Role
    passwordHash: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProfileCountAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends ProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type ProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    displayName?: boolean
    avatarUrl?: boolean
    role?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    watchHistory?: boolean | Profile$watchHistoryArgs<ExtArgs>
    bookmarks?: boolean | Profile$bookmarksArgs<ExtArgs>
    comments?: boolean | Profile$commentsArgs<ExtArgs>
    _count?: boolean | ProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    displayName?: boolean
    avatarUrl?: boolean
    role?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    displayName?: boolean
    avatarUrl?: boolean
    role?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["profile"]>

  export type ProfileSelectScalar = {
    id?: boolean
    username?: boolean
    displayName?: boolean
    avatarUrl?: boolean
    role?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "displayName" | "avatarUrl" | "role" | "passwordHash" | "createdAt" | "updatedAt", ExtArgs["result"]["profile"]>
  export type ProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    watchHistory?: boolean | Profile$watchHistoryArgs<ExtArgs>
    bookmarks?: boolean | Profile$bookmarksArgs<ExtArgs>
    comments?: boolean | Profile$commentsArgs<ExtArgs>
    _count?: boolean | ProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Profile"
    objects: {
      watchHistory: Prisma.$WatchHistoryPayload<ExtArgs>[]
      bookmarks: Prisma.$BookmarkPayload<ExtArgs>[]
      comments: Prisma.$CommentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      displayName: string | null
      avatarUrl: string | null
      role: $Enums.Role
      passwordHash: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["profile"]>
    composites: {}
  }

  type ProfileGetPayload<S extends boolean | null | undefined | ProfileDefaultArgs> = $Result.GetResult<Prisma.$ProfilePayload, S>

  type ProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileCountAggregateInputType | true
    }

  export interface ProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Profile'], meta: { name: 'Profile' } }
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileFindUniqueArgs>(args: SelectSubset<T, ProfileFindUniqueArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Profile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfileFindUniqueOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileFindFirstArgs>(args?: SelectSubset<T, ProfileFindFirstArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfileFindManyArgs>(args?: SelectSubset<T, ProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
     */
    create<T extends ProfileCreateArgs>(args: SelectSubset<T, ProfileCreateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Profiles.
     * @param {ProfileCreateManyArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileCreateManyArgs>(args?: SelectSubset<T, ProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Profiles and returns the data saved in the database.
     * @param {ProfileCreateManyAndReturnArgs} args - Arguments to create many Profiles.
     * @example
     * // Create many Profiles
     * const profile = await prisma.profile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, ProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
     */
    delete<T extends ProfileDeleteArgs>(args: SelectSubset<T, ProfileDeleteArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileUpdateArgs>(args: SelectSubset<T, ProfileUpdateArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileDeleteManyArgs>(args?: SelectSubset<T, ProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileUpdateManyArgs>(args: SelectSubset<T, ProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles and returns the data updated in the database.
     * @param {ProfileUpdateManyAndReturnArgs} args - Arguments to update many Profiles.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Profiles and only return the `id`
     * const profileWithIdOnly = await prisma.profile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, ProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
     */
    upsert<T extends ProfileUpsertArgs>(args: SelectSubset<T, ProfileUpsertArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): Prisma.PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileGroupByArgs['orderBy'] }
        : { orderBy?: ProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Profile model
   */
  readonly fields: ProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    watchHistory<T extends Profile$watchHistoryArgs<ExtArgs> = {}>(args?: Subset<T, Profile$watchHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bookmarks<T extends Profile$bookmarksArgs<ExtArgs> = {}>(args?: Subset<T, Profile$bookmarksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends Profile$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Profile$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Profile model
   */
  interface ProfileFieldRefs {
    readonly id: FieldRef<"Profile", 'String'>
    readonly username: FieldRef<"Profile", 'String'>
    readonly displayName: FieldRef<"Profile", 'String'>
    readonly avatarUrl: FieldRef<"Profile", 'String'>
    readonly role: FieldRef<"Profile", 'Role'>
    readonly passwordHash: FieldRef<"Profile", 'String'>
    readonly createdAt: FieldRef<"Profile", 'DateTime'>
    readonly updatedAt: FieldRef<"Profile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Profile findUnique
   */
  export type ProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findUniqueOrThrow
   */
  export type ProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile findFirst
   */
  export type ProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findFirstOrThrow
   */
  export type ProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profile to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter, which Profiles to fetch.
     */
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     */
    orderBy?: ProfileOrderByWithRelationInput | ProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
     */
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     */
    distinct?: ProfileScalarFieldEnum | ProfileScalarFieldEnum[]
  }

  /**
   * Profile create
   */
  export type ProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a Profile.
     */
    data: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
  }

  /**
   * Profile createMany
   */
  export type ProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile createManyAndReturn
   */
  export type ProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to create many Profiles.
     */
    data: ProfileCreateManyInput | ProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Profile update
   */
  export type ProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a Profile.
     */
    data: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
    /**
     * Choose, which Profile to update.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
  }

  /**
   * Profile updateManyAndReturn
   */
  export type ProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * The data used to update Profiles.
     */
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to update.
     */
    limit?: number
  }

  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the Profile to update in case it exists.
     */
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
     */
    create: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
  }

  /**
   * Profile delete
   */
  export type ProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
    /**
     * Filter which Profile to delete.
     */
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Profiles to delete
     */
    where?: ProfileWhereInput
    /**
     * Limit how many Profiles to delete.
     */
    limit?: number
  }

  /**
   * Profile.watchHistory
   */
  export type Profile$watchHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchHistory
     */
    select?: WatchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchHistory
     */
    omit?: WatchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchHistoryInclude<ExtArgs> | null
    where?: WatchHistoryWhereInput
    orderBy?: WatchHistoryOrderByWithRelationInput | WatchHistoryOrderByWithRelationInput[]
    cursor?: WatchHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WatchHistoryScalarFieldEnum | WatchHistoryScalarFieldEnum[]
  }

  /**
   * Profile.bookmarks
   */
  export type Profile$bookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    where?: BookmarkWhereInput
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    cursor?: BookmarkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookmarkScalarFieldEnum | BookmarkScalarFieldEnum[]
  }

  /**
   * Profile.comments
   */
  export type Profile$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Profile without action
   */
  export type ProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Profile
     */
    select?: ProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Profile
     */
    omit?: ProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileInclude<ExtArgs> | null
  }


  /**
   * Model Anime
   */

  export type AggregateAnime = {
    _count: AnimeCountAggregateOutputType | null
    _avg: AnimeAvgAggregateOutputType | null
    _sum: AnimeSumAggregateOutputType | null
    _min: AnimeMinAggregateOutputType | null
    _max: AnimeMaxAggregateOutputType | null
  }

  export type AnimeAvgAggregateOutputType = {
    score: number | null
    year: number | null
    totalEpisodes: number | null
  }

  export type AnimeSumAggregateOutputType = {
    score: number | null
    year: number | null
    totalEpisodes: number | null
  }

  export type AnimeMinAggregateOutputType = {
    id: string | null
    slug: string | null
    title: string | null
    synopsis: string | null
    status: $Enums.AnimeStatus | null
    type: $Enums.AnimeType | null
    rating: string | null
    score: number | null
    year: number | null
    season: $Enums.Season | null
    posterKey: string | null
    bannerKey: string | null
    totalEpisodes: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AnimeMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    title: string | null
    synopsis: string | null
    status: $Enums.AnimeStatus | null
    type: $Enums.AnimeType | null
    rating: string | null
    score: number | null
    year: number | null
    season: $Enums.Season | null
    posterKey: string | null
    bannerKey: string | null
    totalEpisodes: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AnimeCountAggregateOutputType = {
    id: number
    slug: number
    title: number
    synopsis: number
    status: number
    type: number
    rating: number
    score: number
    year: number
    season: number
    posterKey: number
    bannerKey: number
    totalEpisodes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AnimeAvgAggregateInputType = {
    score?: true
    year?: true
    totalEpisodes?: true
  }

  export type AnimeSumAggregateInputType = {
    score?: true
    year?: true
    totalEpisodes?: true
  }

  export type AnimeMinAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    synopsis?: true
    status?: true
    type?: true
    rating?: true
    score?: true
    year?: true
    season?: true
    posterKey?: true
    bannerKey?: true
    totalEpisodes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AnimeMaxAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    synopsis?: true
    status?: true
    type?: true
    rating?: true
    score?: true
    year?: true
    season?: true
    posterKey?: true
    bannerKey?: true
    totalEpisodes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AnimeCountAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    synopsis?: true
    status?: true
    type?: true
    rating?: true
    score?: true
    year?: true
    season?: true
    posterKey?: true
    bannerKey?: true
    totalEpisodes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AnimeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Anime to aggregate.
     */
    where?: AnimeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Anime to fetch.
     */
    orderBy?: AnimeOrderByWithRelationInput | AnimeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnimeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Anime from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Anime.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Anime
    **/
    _count?: true | AnimeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AnimeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AnimeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnimeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnimeMaxAggregateInputType
  }

  export type GetAnimeAggregateType<T extends AnimeAggregateArgs> = {
        [P in keyof T & keyof AggregateAnime]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnime[P]>
      : GetScalarType<T[P], AggregateAnime[P]>
  }




  export type AnimeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnimeWhereInput
    orderBy?: AnimeOrderByWithAggregationInput | AnimeOrderByWithAggregationInput[]
    by: AnimeScalarFieldEnum[] | AnimeScalarFieldEnum
    having?: AnimeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnimeCountAggregateInputType | true
    _avg?: AnimeAvgAggregateInputType
    _sum?: AnimeSumAggregateInputType
    _min?: AnimeMinAggregateInputType
    _max?: AnimeMaxAggregateInputType
  }

  export type AnimeGroupByOutputType = {
    id: string
    slug: string
    title: string
    synopsis: string | null
    status: $Enums.AnimeStatus
    type: $Enums.AnimeType
    rating: string | null
    score: number | null
    year: number | null
    season: $Enums.Season | null
    posterKey: string | null
    bannerKey: string | null
    totalEpisodes: number | null
    createdAt: Date
    updatedAt: Date
    _count: AnimeCountAggregateOutputType | null
    _avg: AnimeAvgAggregateOutputType | null
    _sum: AnimeSumAggregateOutputType | null
    _min: AnimeMinAggregateOutputType | null
    _max: AnimeMaxAggregateOutputType | null
  }

  type GetAnimeGroupByPayload<T extends AnimeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnimeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnimeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnimeGroupByOutputType[P]>
            : GetScalarType<T[P], AnimeGroupByOutputType[P]>
        }
      >
    >


  export type AnimeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    title?: boolean
    synopsis?: boolean
    status?: boolean
    type?: boolean
    rating?: boolean
    score?: boolean
    year?: boolean
    season?: boolean
    posterKey?: boolean
    bannerKey?: boolean
    totalEpisodes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    genres?: boolean | Anime$genresArgs<ExtArgs>
    episodes?: boolean | Anime$episodesArgs<ExtArgs>
    bookmarks?: boolean | Anime$bookmarksArgs<ExtArgs>
    _count?: boolean | AnimeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["anime"]>

  export type AnimeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    title?: boolean
    synopsis?: boolean
    status?: boolean
    type?: boolean
    rating?: boolean
    score?: boolean
    year?: boolean
    season?: boolean
    posterKey?: boolean
    bannerKey?: boolean
    totalEpisodes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["anime"]>

  export type AnimeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    title?: boolean
    synopsis?: boolean
    status?: boolean
    type?: boolean
    rating?: boolean
    score?: boolean
    year?: boolean
    season?: boolean
    posterKey?: boolean
    bannerKey?: boolean
    totalEpisodes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["anime"]>

  export type AnimeSelectScalar = {
    id?: boolean
    slug?: boolean
    title?: boolean
    synopsis?: boolean
    status?: boolean
    type?: boolean
    rating?: boolean
    score?: boolean
    year?: boolean
    season?: boolean
    posterKey?: boolean
    bannerKey?: boolean
    totalEpisodes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AnimeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "title" | "synopsis" | "status" | "type" | "rating" | "score" | "year" | "season" | "posterKey" | "bannerKey" | "totalEpisodes" | "createdAt" | "updatedAt", ExtArgs["result"]["anime"]>
  export type AnimeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    genres?: boolean | Anime$genresArgs<ExtArgs>
    episodes?: boolean | Anime$episodesArgs<ExtArgs>
    bookmarks?: boolean | Anime$bookmarksArgs<ExtArgs>
    _count?: boolean | AnimeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AnimeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AnimeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AnimePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Anime"
    objects: {
      genres: Prisma.$AnimeGenrePayload<ExtArgs>[]
      episodes: Prisma.$EpisodePayload<ExtArgs>[]
      bookmarks: Prisma.$BookmarkPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      title: string
      synopsis: string | null
      status: $Enums.AnimeStatus
      type: $Enums.AnimeType
      rating: string | null
      score: number | null
      year: number | null
      season: $Enums.Season | null
      posterKey: string | null
      bannerKey: string | null
      totalEpisodes: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["anime"]>
    composites: {}
  }

  type AnimeGetPayload<S extends boolean | null | undefined | AnimeDefaultArgs> = $Result.GetResult<Prisma.$AnimePayload, S>

  type AnimeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnimeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnimeCountAggregateInputType | true
    }

  export interface AnimeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Anime'], meta: { name: 'Anime' } }
    /**
     * Find zero or one Anime that matches the filter.
     * @param {AnimeFindUniqueArgs} args - Arguments to find a Anime
     * @example
     * // Get one Anime
     * const anime = await prisma.anime.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnimeFindUniqueArgs>(args: SelectSubset<T, AnimeFindUniqueArgs<ExtArgs>>): Prisma__AnimeClient<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Anime that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnimeFindUniqueOrThrowArgs} args - Arguments to find a Anime
     * @example
     * // Get one Anime
     * const anime = await prisma.anime.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnimeFindUniqueOrThrowArgs>(args: SelectSubset<T, AnimeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnimeClient<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Anime that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeFindFirstArgs} args - Arguments to find a Anime
     * @example
     * // Get one Anime
     * const anime = await prisma.anime.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnimeFindFirstArgs>(args?: SelectSubset<T, AnimeFindFirstArgs<ExtArgs>>): Prisma__AnimeClient<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Anime that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeFindFirstOrThrowArgs} args - Arguments to find a Anime
     * @example
     * // Get one Anime
     * const anime = await prisma.anime.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnimeFindFirstOrThrowArgs>(args?: SelectSubset<T, AnimeFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnimeClient<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Anime that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Anime
     * const anime = await prisma.anime.findMany()
     * 
     * // Get first 10 Anime
     * const anime = await prisma.anime.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const animeWithIdOnly = await prisma.anime.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnimeFindManyArgs>(args?: SelectSubset<T, AnimeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Anime.
     * @param {AnimeCreateArgs} args - Arguments to create a Anime.
     * @example
     * // Create one Anime
     * const Anime = await prisma.anime.create({
     *   data: {
     *     // ... data to create a Anime
     *   }
     * })
     * 
     */
    create<T extends AnimeCreateArgs>(args: SelectSubset<T, AnimeCreateArgs<ExtArgs>>): Prisma__AnimeClient<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Anime.
     * @param {AnimeCreateManyArgs} args - Arguments to create many Anime.
     * @example
     * // Create many Anime
     * const anime = await prisma.anime.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnimeCreateManyArgs>(args?: SelectSubset<T, AnimeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Anime and returns the data saved in the database.
     * @param {AnimeCreateManyAndReturnArgs} args - Arguments to create many Anime.
     * @example
     * // Create many Anime
     * const anime = await prisma.anime.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Anime and only return the `id`
     * const animeWithIdOnly = await prisma.anime.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnimeCreateManyAndReturnArgs>(args?: SelectSubset<T, AnimeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Anime.
     * @param {AnimeDeleteArgs} args - Arguments to delete one Anime.
     * @example
     * // Delete one Anime
     * const Anime = await prisma.anime.delete({
     *   where: {
     *     // ... filter to delete one Anime
     *   }
     * })
     * 
     */
    delete<T extends AnimeDeleteArgs>(args: SelectSubset<T, AnimeDeleteArgs<ExtArgs>>): Prisma__AnimeClient<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Anime.
     * @param {AnimeUpdateArgs} args - Arguments to update one Anime.
     * @example
     * // Update one Anime
     * const anime = await prisma.anime.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnimeUpdateArgs>(args: SelectSubset<T, AnimeUpdateArgs<ExtArgs>>): Prisma__AnimeClient<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Anime.
     * @param {AnimeDeleteManyArgs} args - Arguments to filter Anime to delete.
     * @example
     * // Delete a few Anime
     * const { count } = await prisma.anime.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnimeDeleteManyArgs>(args?: SelectSubset<T, AnimeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Anime.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Anime
     * const anime = await prisma.anime.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnimeUpdateManyArgs>(args: SelectSubset<T, AnimeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Anime and returns the data updated in the database.
     * @param {AnimeUpdateManyAndReturnArgs} args - Arguments to update many Anime.
     * @example
     * // Update many Anime
     * const anime = await prisma.anime.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Anime and only return the `id`
     * const animeWithIdOnly = await prisma.anime.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnimeUpdateManyAndReturnArgs>(args: SelectSubset<T, AnimeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Anime.
     * @param {AnimeUpsertArgs} args - Arguments to update or create a Anime.
     * @example
     * // Update or create a Anime
     * const anime = await prisma.anime.upsert({
     *   create: {
     *     // ... data to create a Anime
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Anime we want to update
     *   }
     * })
     */
    upsert<T extends AnimeUpsertArgs>(args: SelectSubset<T, AnimeUpsertArgs<ExtArgs>>): Prisma__AnimeClient<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Anime.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeCountArgs} args - Arguments to filter Anime to count.
     * @example
     * // Count the number of Anime
     * const count = await prisma.anime.count({
     *   where: {
     *     // ... the filter for the Anime we want to count
     *   }
     * })
    **/
    count<T extends AnimeCountArgs>(
      args?: Subset<T, AnimeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnimeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Anime.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnimeAggregateArgs>(args: Subset<T, AnimeAggregateArgs>): Prisma.PrismaPromise<GetAnimeAggregateType<T>>

    /**
     * Group by Anime.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnimeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnimeGroupByArgs['orderBy'] }
        : { orderBy?: AnimeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnimeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnimeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Anime model
   */
  readonly fields: AnimeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Anime.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnimeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    genres<T extends Anime$genresArgs<ExtArgs> = {}>(args?: Subset<T, Anime$genresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimeGenrePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    episodes<T extends Anime$episodesArgs<ExtArgs> = {}>(args?: Subset<T, Anime$episodesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EpisodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bookmarks<T extends Anime$bookmarksArgs<ExtArgs> = {}>(args?: Subset<T, Anime$bookmarksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Anime model
   */
  interface AnimeFieldRefs {
    readonly id: FieldRef<"Anime", 'String'>
    readonly slug: FieldRef<"Anime", 'String'>
    readonly title: FieldRef<"Anime", 'String'>
    readonly synopsis: FieldRef<"Anime", 'String'>
    readonly status: FieldRef<"Anime", 'AnimeStatus'>
    readonly type: FieldRef<"Anime", 'AnimeType'>
    readonly rating: FieldRef<"Anime", 'String'>
    readonly score: FieldRef<"Anime", 'Float'>
    readonly year: FieldRef<"Anime", 'Int'>
    readonly season: FieldRef<"Anime", 'Season'>
    readonly posterKey: FieldRef<"Anime", 'String'>
    readonly bannerKey: FieldRef<"Anime", 'String'>
    readonly totalEpisodes: FieldRef<"Anime", 'Int'>
    readonly createdAt: FieldRef<"Anime", 'DateTime'>
    readonly updatedAt: FieldRef<"Anime", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Anime findUnique
   */
  export type AnimeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anime
     */
    omit?: AnimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeInclude<ExtArgs> | null
    /**
     * Filter, which Anime to fetch.
     */
    where: AnimeWhereUniqueInput
  }

  /**
   * Anime findUniqueOrThrow
   */
  export type AnimeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anime
     */
    omit?: AnimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeInclude<ExtArgs> | null
    /**
     * Filter, which Anime to fetch.
     */
    where: AnimeWhereUniqueInput
  }

  /**
   * Anime findFirst
   */
  export type AnimeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anime
     */
    omit?: AnimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeInclude<ExtArgs> | null
    /**
     * Filter, which Anime to fetch.
     */
    where?: AnimeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Anime to fetch.
     */
    orderBy?: AnimeOrderByWithRelationInput | AnimeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Anime.
     */
    cursor?: AnimeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Anime from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Anime.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Anime.
     */
    distinct?: AnimeScalarFieldEnum | AnimeScalarFieldEnum[]
  }

  /**
   * Anime findFirstOrThrow
   */
  export type AnimeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anime
     */
    omit?: AnimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeInclude<ExtArgs> | null
    /**
     * Filter, which Anime to fetch.
     */
    where?: AnimeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Anime to fetch.
     */
    orderBy?: AnimeOrderByWithRelationInput | AnimeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Anime.
     */
    cursor?: AnimeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Anime from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Anime.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Anime.
     */
    distinct?: AnimeScalarFieldEnum | AnimeScalarFieldEnum[]
  }

  /**
   * Anime findMany
   */
  export type AnimeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anime
     */
    omit?: AnimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeInclude<ExtArgs> | null
    /**
     * Filter, which Anime to fetch.
     */
    where?: AnimeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Anime to fetch.
     */
    orderBy?: AnimeOrderByWithRelationInput | AnimeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Anime.
     */
    cursor?: AnimeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Anime from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Anime.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Anime.
     */
    distinct?: AnimeScalarFieldEnum | AnimeScalarFieldEnum[]
  }

  /**
   * Anime create
   */
  export type AnimeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anime
     */
    omit?: AnimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeInclude<ExtArgs> | null
    /**
     * The data needed to create a Anime.
     */
    data: XOR<AnimeCreateInput, AnimeUncheckedCreateInput>
  }

  /**
   * Anime createMany
   */
  export type AnimeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Anime.
     */
    data: AnimeCreateManyInput | AnimeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Anime createManyAndReturn
   */
  export type AnimeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Anime
     */
    omit?: AnimeOmit<ExtArgs> | null
    /**
     * The data used to create many Anime.
     */
    data: AnimeCreateManyInput | AnimeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Anime update
   */
  export type AnimeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anime
     */
    omit?: AnimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeInclude<ExtArgs> | null
    /**
     * The data needed to update a Anime.
     */
    data: XOR<AnimeUpdateInput, AnimeUncheckedUpdateInput>
    /**
     * Choose, which Anime to update.
     */
    where: AnimeWhereUniqueInput
  }

  /**
   * Anime updateMany
   */
  export type AnimeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Anime.
     */
    data: XOR<AnimeUpdateManyMutationInput, AnimeUncheckedUpdateManyInput>
    /**
     * Filter which Anime to update
     */
    where?: AnimeWhereInput
    /**
     * Limit how many Anime to update.
     */
    limit?: number
  }

  /**
   * Anime updateManyAndReturn
   */
  export type AnimeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Anime
     */
    omit?: AnimeOmit<ExtArgs> | null
    /**
     * The data used to update Anime.
     */
    data: XOR<AnimeUpdateManyMutationInput, AnimeUncheckedUpdateManyInput>
    /**
     * Filter which Anime to update
     */
    where?: AnimeWhereInput
    /**
     * Limit how many Anime to update.
     */
    limit?: number
  }

  /**
   * Anime upsert
   */
  export type AnimeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anime
     */
    omit?: AnimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeInclude<ExtArgs> | null
    /**
     * The filter to search for the Anime to update in case it exists.
     */
    where: AnimeWhereUniqueInput
    /**
     * In case the Anime found by the `where` argument doesn't exist, create a new Anime with this data.
     */
    create: XOR<AnimeCreateInput, AnimeUncheckedCreateInput>
    /**
     * In case the Anime was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnimeUpdateInput, AnimeUncheckedUpdateInput>
  }

  /**
   * Anime delete
   */
  export type AnimeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anime
     */
    omit?: AnimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeInclude<ExtArgs> | null
    /**
     * Filter which Anime to delete.
     */
    where: AnimeWhereUniqueInput
  }

  /**
   * Anime deleteMany
   */
  export type AnimeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Anime to delete
     */
    where?: AnimeWhereInput
    /**
     * Limit how many Anime to delete.
     */
    limit?: number
  }

  /**
   * Anime.genres
   */
  export type Anime$genresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimeGenre
     */
    select?: AnimeGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnimeGenre
     */
    omit?: AnimeGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeGenreInclude<ExtArgs> | null
    where?: AnimeGenreWhereInput
    orderBy?: AnimeGenreOrderByWithRelationInput | AnimeGenreOrderByWithRelationInput[]
    cursor?: AnimeGenreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnimeGenreScalarFieldEnum | AnimeGenreScalarFieldEnum[]
  }

  /**
   * Anime.episodes
   */
  export type Anime$episodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Episode
     */
    select?: EpisodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Episode
     */
    omit?: EpisodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EpisodeInclude<ExtArgs> | null
    where?: EpisodeWhereInput
    orderBy?: EpisodeOrderByWithRelationInput | EpisodeOrderByWithRelationInput[]
    cursor?: EpisodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EpisodeScalarFieldEnum | EpisodeScalarFieldEnum[]
  }

  /**
   * Anime.bookmarks
   */
  export type Anime$bookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    where?: BookmarkWhereInput
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    cursor?: BookmarkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookmarkScalarFieldEnum | BookmarkScalarFieldEnum[]
  }

  /**
   * Anime without action
   */
  export type AnimeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Anime
     */
    omit?: AnimeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeInclude<ExtArgs> | null
  }


  /**
   * Model Genre
   */

  export type AggregateGenre = {
    _count: GenreCountAggregateOutputType | null
    _avg: GenreAvgAggregateOutputType | null
    _sum: GenreSumAggregateOutputType | null
    _min: GenreMinAggregateOutputType | null
    _max: GenreMaxAggregateOutputType | null
  }

  export type GenreAvgAggregateOutputType = {
    id: number | null
  }

  export type GenreSumAggregateOutputType = {
    id: number | null
  }

  export type GenreMinAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
  }

  export type GenreMaxAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
  }

  export type GenreCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    _all: number
  }


  export type GenreAvgAggregateInputType = {
    id?: true
  }

  export type GenreSumAggregateInputType = {
    id?: true
  }

  export type GenreMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
  }

  export type GenreMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
  }

  export type GenreCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    _all?: true
  }

  export type GenreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Genre to aggregate.
     */
    where?: GenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Genres to fetch.
     */
    orderBy?: GenreOrderByWithRelationInput | GenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Genres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Genres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Genres
    **/
    _count?: true | GenreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GenreAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GenreSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GenreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GenreMaxAggregateInputType
  }

  export type GetGenreAggregateType<T extends GenreAggregateArgs> = {
        [P in keyof T & keyof AggregateGenre]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGenre[P]>
      : GetScalarType<T[P], AggregateGenre[P]>
  }




  export type GenreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GenreWhereInput
    orderBy?: GenreOrderByWithAggregationInput | GenreOrderByWithAggregationInput[]
    by: GenreScalarFieldEnum[] | GenreScalarFieldEnum
    having?: GenreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GenreCountAggregateInputType | true
    _avg?: GenreAvgAggregateInputType
    _sum?: GenreSumAggregateInputType
    _min?: GenreMinAggregateInputType
    _max?: GenreMaxAggregateInputType
  }

  export type GenreGroupByOutputType = {
    id: number
    name: string
    slug: string
    _count: GenreCountAggregateOutputType | null
    _avg: GenreAvgAggregateOutputType | null
    _sum: GenreSumAggregateOutputType | null
    _min: GenreMinAggregateOutputType | null
    _max: GenreMaxAggregateOutputType | null
  }

  type GetGenreGroupByPayload<T extends GenreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GenreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GenreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GenreGroupByOutputType[P]>
            : GetScalarType<T[P], GenreGroupByOutputType[P]>
        }
      >
    >


  export type GenreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    animes?: boolean | Genre$animesArgs<ExtArgs>
    _count?: boolean | GenreCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["genre"]>

  export type GenreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
  }, ExtArgs["result"]["genre"]>

  export type GenreSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
  }, ExtArgs["result"]["genre"]>

  export type GenreSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
  }

  export type GenreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug", ExtArgs["result"]["genre"]>
  export type GenreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    animes?: boolean | Genre$animesArgs<ExtArgs>
    _count?: boolean | GenreCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GenreIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type GenreIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GenrePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Genre"
    objects: {
      animes: Prisma.$AnimeGenrePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      slug: string
    }, ExtArgs["result"]["genre"]>
    composites: {}
  }

  type GenreGetPayload<S extends boolean | null | undefined | GenreDefaultArgs> = $Result.GetResult<Prisma.$GenrePayload, S>

  type GenreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GenreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GenreCountAggregateInputType | true
    }

  export interface GenreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Genre'], meta: { name: 'Genre' } }
    /**
     * Find zero or one Genre that matches the filter.
     * @param {GenreFindUniqueArgs} args - Arguments to find a Genre
     * @example
     * // Get one Genre
     * const genre = await prisma.genre.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GenreFindUniqueArgs>(args: SelectSubset<T, GenreFindUniqueArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Genre that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GenreFindUniqueOrThrowArgs} args - Arguments to find a Genre
     * @example
     * // Get one Genre
     * const genre = await prisma.genre.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GenreFindUniqueOrThrowArgs>(args: SelectSubset<T, GenreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Genre that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreFindFirstArgs} args - Arguments to find a Genre
     * @example
     * // Get one Genre
     * const genre = await prisma.genre.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GenreFindFirstArgs>(args?: SelectSubset<T, GenreFindFirstArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Genre that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreFindFirstOrThrowArgs} args - Arguments to find a Genre
     * @example
     * // Get one Genre
     * const genre = await prisma.genre.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GenreFindFirstOrThrowArgs>(args?: SelectSubset<T, GenreFindFirstOrThrowArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Genres that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Genres
     * const genres = await prisma.genre.findMany()
     * 
     * // Get first 10 Genres
     * const genres = await prisma.genre.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const genreWithIdOnly = await prisma.genre.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GenreFindManyArgs>(args?: SelectSubset<T, GenreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Genre.
     * @param {GenreCreateArgs} args - Arguments to create a Genre.
     * @example
     * // Create one Genre
     * const Genre = await prisma.genre.create({
     *   data: {
     *     // ... data to create a Genre
     *   }
     * })
     * 
     */
    create<T extends GenreCreateArgs>(args: SelectSubset<T, GenreCreateArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Genres.
     * @param {GenreCreateManyArgs} args - Arguments to create many Genres.
     * @example
     * // Create many Genres
     * const genre = await prisma.genre.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GenreCreateManyArgs>(args?: SelectSubset<T, GenreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Genres and returns the data saved in the database.
     * @param {GenreCreateManyAndReturnArgs} args - Arguments to create many Genres.
     * @example
     * // Create many Genres
     * const genre = await prisma.genre.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Genres and only return the `id`
     * const genreWithIdOnly = await prisma.genre.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GenreCreateManyAndReturnArgs>(args?: SelectSubset<T, GenreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Genre.
     * @param {GenreDeleteArgs} args - Arguments to delete one Genre.
     * @example
     * // Delete one Genre
     * const Genre = await prisma.genre.delete({
     *   where: {
     *     // ... filter to delete one Genre
     *   }
     * })
     * 
     */
    delete<T extends GenreDeleteArgs>(args: SelectSubset<T, GenreDeleteArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Genre.
     * @param {GenreUpdateArgs} args - Arguments to update one Genre.
     * @example
     * // Update one Genre
     * const genre = await prisma.genre.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GenreUpdateArgs>(args: SelectSubset<T, GenreUpdateArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Genres.
     * @param {GenreDeleteManyArgs} args - Arguments to filter Genres to delete.
     * @example
     * // Delete a few Genres
     * const { count } = await prisma.genre.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GenreDeleteManyArgs>(args?: SelectSubset<T, GenreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Genres.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Genres
     * const genre = await prisma.genre.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GenreUpdateManyArgs>(args: SelectSubset<T, GenreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Genres and returns the data updated in the database.
     * @param {GenreUpdateManyAndReturnArgs} args - Arguments to update many Genres.
     * @example
     * // Update many Genres
     * const genre = await prisma.genre.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Genres and only return the `id`
     * const genreWithIdOnly = await prisma.genre.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GenreUpdateManyAndReturnArgs>(args: SelectSubset<T, GenreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Genre.
     * @param {GenreUpsertArgs} args - Arguments to update or create a Genre.
     * @example
     * // Update or create a Genre
     * const genre = await prisma.genre.upsert({
     *   create: {
     *     // ... data to create a Genre
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Genre we want to update
     *   }
     * })
     */
    upsert<T extends GenreUpsertArgs>(args: SelectSubset<T, GenreUpsertArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Genres.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreCountArgs} args - Arguments to filter Genres to count.
     * @example
     * // Count the number of Genres
     * const count = await prisma.genre.count({
     *   where: {
     *     // ... the filter for the Genres we want to count
     *   }
     * })
    **/
    count<T extends GenreCountArgs>(
      args?: Subset<T, GenreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GenreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Genre.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GenreAggregateArgs>(args: Subset<T, GenreAggregateArgs>): Prisma.PrismaPromise<GetGenreAggregateType<T>>

    /**
     * Group by Genre.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GenreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GenreGroupByArgs['orderBy'] }
        : { orderBy?: GenreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GenreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGenreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Genre model
   */
  readonly fields: GenreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Genre.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GenreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    animes<T extends Genre$animesArgs<ExtArgs> = {}>(args?: Subset<T, Genre$animesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimeGenrePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Genre model
   */
  interface GenreFieldRefs {
    readonly id: FieldRef<"Genre", 'Int'>
    readonly name: FieldRef<"Genre", 'String'>
    readonly slug: FieldRef<"Genre", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Genre findUnique
   */
  export type GenreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter, which Genre to fetch.
     */
    where: GenreWhereUniqueInput
  }

  /**
   * Genre findUniqueOrThrow
   */
  export type GenreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter, which Genre to fetch.
     */
    where: GenreWhereUniqueInput
  }

  /**
   * Genre findFirst
   */
  export type GenreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter, which Genre to fetch.
     */
    where?: GenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Genres to fetch.
     */
    orderBy?: GenreOrderByWithRelationInput | GenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Genres.
     */
    cursor?: GenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Genres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Genres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Genres.
     */
    distinct?: GenreScalarFieldEnum | GenreScalarFieldEnum[]
  }

  /**
   * Genre findFirstOrThrow
   */
  export type GenreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter, which Genre to fetch.
     */
    where?: GenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Genres to fetch.
     */
    orderBy?: GenreOrderByWithRelationInput | GenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Genres.
     */
    cursor?: GenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Genres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Genres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Genres.
     */
    distinct?: GenreScalarFieldEnum | GenreScalarFieldEnum[]
  }

  /**
   * Genre findMany
   */
  export type GenreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter, which Genres to fetch.
     */
    where?: GenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Genres to fetch.
     */
    orderBy?: GenreOrderByWithRelationInput | GenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Genres.
     */
    cursor?: GenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Genres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Genres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Genres.
     */
    distinct?: GenreScalarFieldEnum | GenreScalarFieldEnum[]
  }

  /**
   * Genre create
   */
  export type GenreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * The data needed to create a Genre.
     */
    data: XOR<GenreCreateInput, GenreUncheckedCreateInput>
  }

  /**
   * Genre createMany
   */
  export type GenreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Genres.
     */
    data: GenreCreateManyInput | GenreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Genre createManyAndReturn
   */
  export type GenreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * The data used to create many Genres.
     */
    data: GenreCreateManyInput | GenreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Genre update
   */
  export type GenreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * The data needed to update a Genre.
     */
    data: XOR<GenreUpdateInput, GenreUncheckedUpdateInput>
    /**
     * Choose, which Genre to update.
     */
    where: GenreWhereUniqueInput
  }

  /**
   * Genre updateMany
   */
  export type GenreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Genres.
     */
    data: XOR<GenreUpdateManyMutationInput, GenreUncheckedUpdateManyInput>
    /**
     * Filter which Genres to update
     */
    where?: GenreWhereInput
    /**
     * Limit how many Genres to update.
     */
    limit?: number
  }

  /**
   * Genre updateManyAndReturn
   */
  export type GenreUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * The data used to update Genres.
     */
    data: XOR<GenreUpdateManyMutationInput, GenreUncheckedUpdateManyInput>
    /**
     * Filter which Genres to update
     */
    where?: GenreWhereInput
    /**
     * Limit how many Genres to update.
     */
    limit?: number
  }

  /**
   * Genre upsert
   */
  export type GenreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * The filter to search for the Genre to update in case it exists.
     */
    where: GenreWhereUniqueInput
    /**
     * In case the Genre found by the `where` argument doesn't exist, create a new Genre with this data.
     */
    create: XOR<GenreCreateInput, GenreUncheckedCreateInput>
    /**
     * In case the Genre was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GenreUpdateInput, GenreUncheckedUpdateInput>
  }

  /**
   * Genre delete
   */
  export type GenreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter which Genre to delete.
     */
    where: GenreWhereUniqueInput
  }

  /**
   * Genre deleteMany
   */
  export type GenreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Genres to delete
     */
    where?: GenreWhereInput
    /**
     * Limit how many Genres to delete.
     */
    limit?: number
  }

  /**
   * Genre.animes
   */
  export type Genre$animesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimeGenre
     */
    select?: AnimeGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnimeGenre
     */
    omit?: AnimeGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeGenreInclude<ExtArgs> | null
    where?: AnimeGenreWhereInput
    orderBy?: AnimeGenreOrderByWithRelationInput | AnimeGenreOrderByWithRelationInput[]
    cursor?: AnimeGenreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnimeGenreScalarFieldEnum | AnimeGenreScalarFieldEnum[]
  }

  /**
   * Genre without action
   */
  export type GenreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
  }


  /**
   * Model AnimeGenre
   */

  export type AggregateAnimeGenre = {
    _count: AnimeGenreCountAggregateOutputType | null
    _avg: AnimeGenreAvgAggregateOutputType | null
    _sum: AnimeGenreSumAggregateOutputType | null
    _min: AnimeGenreMinAggregateOutputType | null
    _max: AnimeGenreMaxAggregateOutputType | null
  }

  export type AnimeGenreAvgAggregateOutputType = {
    genreId: number | null
  }

  export type AnimeGenreSumAggregateOutputType = {
    genreId: number | null
  }

  export type AnimeGenreMinAggregateOutputType = {
    animeId: string | null
    genreId: number | null
  }

  export type AnimeGenreMaxAggregateOutputType = {
    animeId: string | null
    genreId: number | null
  }

  export type AnimeGenreCountAggregateOutputType = {
    animeId: number
    genreId: number
    _all: number
  }


  export type AnimeGenreAvgAggregateInputType = {
    genreId?: true
  }

  export type AnimeGenreSumAggregateInputType = {
    genreId?: true
  }

  export type AnimeGenreMinAggregateInputType = {
    animeId?: true
    genreId?: true
  }

  export type AnimeGenreMaxAggregateInputType = {
    animeId?: true
    genreId?: true
  }

  export type AnimeGenreCountAggregateInputType = {
    animeId?: true
    genreId?: true
    _all?: true
  }

  export type AnimeGenreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnimeGenre to aggregate.
     */
    where?: AnimeGenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnimeGenres to fetch.
     */
    orderBy?: AnimeGenreOrderByWithRelationInput | AnimeGenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnimeGenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnimeGenres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnimeGenres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AnimeGenres
    **/
    _count?: true | AnimeGenreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AnimeGenreAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AnimeGenreSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnimeGenreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnimeGenreMaxAggregateInputType
  }

  export type GetAnimeGenreAggregateType<T extends AnimeGenreAggregateArgs> = {
        [P in keyof T & keyof AggregateAnimeGenre]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnimeGenre[P]>
      : GetScalarType<T[P], AggregateAnimeGenre[P]>
  }




  export type AnimeGenreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnimeGenreWhereInput
    orderBy?: AnimeGenreOrderByWithAggregationInput | AnimeGenreOrderByWithAggregationInput[]
    by: AnimeGenreScalarFieldEnum[] | AnimeGenreScalarFieldEnum
    having?: AnimeGenreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnimeGenreCountAggregateInputType | true
    _avg?: AnimeGenreAvgAggregateInputType
    _sum?: AnimeGenreSumAggregateInputType
    _min?: AnimeGenreMinAggregateInputType
    _max?: AnimeGenreMaxAggregateInputType
  }

  export type AnimeGenreGroupByOutputType = {
    animeId: string
    genreId: number
    _count: AnimeGenreCountAggregateOutputType | null
    _avg: AnimeGenreAvgAggregateOutputType | null
    _sum: AnimeGenreSumAggregateOutputType | null
    _min: AnimeGenreMinAggregateOutputType | null
    _max: AnimeGenreMaxAggregateOutputType | null
  }

  type GetAnimeGenreGroupByPayload<T extends AnimeGenreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnimeGenreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnimeGenreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnimeGenreGroupByOutputType[P]>
            : GetScalarType<T[P], AnimeGenreGroupByOutputType[P]>
        }
      >
    >


  export type AnimeGenreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    animeId?: boolean
    genreId?: boolean
    anime?: boolean | AnimeDefaultArgs<ExtArgs>
    genre?: boolean | GenreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["animeGenre"]>

  export type AnimeGenreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    animeId?: boolean
    genreId?: boolean
    anime?: boolean | AnimeDefaultArgs<ExtArgs>
    genre?: boolean | GenreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["animeGenre"]>

  export type AnimeGenreSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    animeId?: boolean
    genreId?: boolean
    anime?: boolean | AnimeDefaultArgs<ExtArgs>
    genre?: boolean | GenreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["animeGenre"]>

  export type AnimeGenreSelectScalar = {
    animeId?: boolean
    genreId?: boolean
  }

  export type AnimeGenreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"animeId" | "genreId", ExtArgs["result"]["animeGenre"]>
  export type AnimeGenreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    anime?: boolean | AnimeDefaultArgs<ExtArgs>
    genre?: boolean | GenreDefaultArgs<ExtArgs>
  }
  export type AnimeGenreIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    anime?: boolean | AnimeDefaultArgs<ExtArgs>
    genre?: boolean | GenreDefaultArgs<ExtArgs>
  }
  export type AnimeGenreIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    anime?: boolean | AnimeDefaultArgs<ExtArgs>
    genre?: boolean | GenreDefaultArgs<ExtArgs>
  }

  export type $AnimeGenrePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AnimeGenre"
    objects: {
      anime: Prisma.$AnimePayload<ExtArgs>
      genre: Prisma.$GenrePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      animeId: string
      genreId: number
    }, ExtArgs["result"]["animeGenre"]>
    composites: {}
  }

  type AnimeGenreGetPayload<S extends boolean | null | undefined | AnimeGenreDefaultArgs> = $Result.GetResult<Prisma.$AnimeGenrePayload, S>

  type AnimeGenreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnimeGenreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnimeGenreCountAggregateInputType | true
    }

  export interface AnimeGenreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AnimeGenre'], meta: { name: 'AnimeGenre' } }
    /**
     * Find zero or one AnimeGenre that matches the filter.
     * @param {AnimeGenreFindUniqueArgs} args - Arguments to find a AnimeGenre
     * @example
     * // Get one AnimeGenre
     * const animeGenre = await prisma.animeGenre.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnimeGenreFindUniqueArgs>(args: SelectSubset<T, AnimeGenreFindUniqueArgs<ExtArgs>>): Prisma__AnimeGenreClient<$Result.GetResult<Prisma.$AnimeGenrePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AnimeGenre that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnimeGenreFindUniqueOrThrowArgs} args - Arguments to find a AnimeGenre
     * @example
     * // Get one AnimeGenre
     * const animeGenre = await prisma.animeGenre.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnimeGenreFindUniqueOrThrowArgs>(args: SelectSubset<T, AnimeGenreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnimeGenreClient<$Result.GetResult<Prisma.$AnimeGenrePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnimeGenre that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeGenreFindFirstArgs} args - Arguments to find a AnimeGenre
     * @example
     * // Get one AnimeGenre
     * const animeGenre = await prisma.animeGenre.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnimeGenreFindFirstArgs>(args?: SelectSubset<T, AnimeGenreFindFirstArgs<ExtArgs>>): Prisma__AnimeGenreClient<$Result.GetResult<Prisma.$AnimeGenrePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnimeGenre that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeGenreFindFirstOrThrowArgs} args - Arguments to find a AnimeGenre
     * @example
     * // Get one AnimeGenre
     * const animeGenre = await prisma.animeGenre.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnimeGenreFindFirstOrThrowArgs>(args?: SelectSubset<T, AnimeGenreFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnimeGenreClient<$Result.GetResult<Prisma.$AnimeGenrePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AnimeGenres that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeGenreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AnimeGenres
     * const animeGenres = await prisma.animeGenre.findMany()
     * 
     * // Get first 10 AnimeGenres
     * const animeGenres = await prisma.animeGenre.findMany({ take: 10 })
     * 
     * // Only select the `animeId`
     * const animeGenreWithAnimeIdOnly = await prisma.animeGenre.findMany({ select: { animeId: true } })
     * 
     */
    findMany<T extends AnimeGenreFindManyArgs>(args?: SelectSubset<T, AnimeGenreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimeGenrePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AnimeGenre.
     * @param {AnimeGenreCreateArgs} args - Arguments to create a AnimeGenre.
     * @example
     * // Create one AnimeGenre
     * const AnimeGenre = await prisma.animeGenre.create({
     *   data: {
     *     // ... data to create a AnimeGenre
     *   }
     * })
     * 
     */
    create<T extends AnimeGenreCreateArgs>(args: SelectSubset<T, AnimeGenreCreateArgs<ExtArgs>>): Prisma__AnimeGenreClient<$Result.GetResult<Prisma.$AnimeGenrePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AnimeGenres.
     * @param {AnimeGenreCreateManyArgs} args - Arguments to create many AnimeGenres.
     * @example
     * // Create many AnimeGenres
     * const animeGenre = await prisma.animeGenre.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnimeGenreCreateManyArgs>(args?: SelectSubset<T, AnimeGenreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AnimeGenres and returns the data saved in the database.
     * @param {AnimeGenreCreateManyAndReturnArgs} args - Arguments to create many AnimeGenres.
     * @example
     * // Create many AnimeGenres
     * const animeGenre = await prisma.animeGenre.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AnimeGenres and only return the `animeId`
     * const animeGenreWithAnimeIdOnly = await prisma.animeGenre.createManyAndReturn({
     *   select: { animeId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnimeGenreCreateManyAndReturnArgs>(args?: SelectSubset<T, AnimeGenreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimeGenrePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AnimeGenre.
     * @param {AnimeGenreDeleteArgs} args - Arguments to delete one AnimeGenre.
     * @example
     * // Delete one AnimeGenre
     * const AnimeGenre = await prisma.animeGenre.delete({
     *   where: {
     *     // ... filter to delete one AnimeGenre
     *   }
     * })
     * 
     */
    delete<T extends AnimeGenreDeleteArgs>(args: SelectSubset<T, AnimeGenreDeleteArgs<ExtArgs>>): Prisma__AnimeGenreClient<$Result.GetResult<Prisma.$AnimeGenrePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AnimeGenre.
     * @param {AnimeGenreUpdateArgs} args - Arguments to update one AnimeGenre.
     * @example
     * // Update one AnimeGenre
     * const animeGenre = await prisma.animeGenre.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnimeGenreUpdateArgs>(args: SelectSubset<T, AnimeGenreUpdateArgs<ExtArgs>>): Prisma__AnimeGenreClient<$Result.GetResult<Prisma.$AnimeGenrePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AnimeGenres.
     * @param {AnimeGenreDeleteManyArgs} args - Arguments to filter AnimeGenres to delete.
     * @example
     * // Delete a few AnimeGenres
     * const { count } = await prisma.animeGenre.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnimeGenreDeleteManyArgs>(args?: SelectSubset<T, AnimeGenreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnimeGenres.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeGenreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AnimeGenres
     * const animeGenre = await prisma.animeGenre.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnimeGenreUpdateManyArgs>(args: SelectSubset<T, AnimeGenreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnimeGenres and returns the data updated in the database.
     * @param {AnimeGenreUpdateManyAndReturnArgs} args - Arguments to update many AnimeGenres.
     * @example
     * // Update many AnimeGenres
     * const animeGenre = await prisma.animeGenre.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AnimeGenres and only return the `animeId`
     * const animeGenreWithAnimeIdOnly = await prisma.animeGenre.updateManyAndReturn({
     *   select: { animeId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnimeGenreUpdateManyAndReturnArgs>(args: SelectSubset<T, AnimeGenreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimeGenrePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AnimeGenre.
     * @param {AnimeGenreUpsertArgs} args - Arguments to update or create a AnimeGenre.
     * @example
     * // Update or create a AnimeGenre
     * const animeGenre = await prisma.animeGenre.upsert({
     *   create: {
     *     // ... data to create a AnimeGenre
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AnimeGenre we want to update
     *   }
     * })
     */
    upsert<T extends AnimeGenreUpsertArgs>(args: SelectSubset<T, AnimeGenreUpsertArgs<ExtArgs>>): Prisma__AnimeGenreClient<$Result.GetResult<Prisma.$AnimeGenrePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AnimeGenres.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeGenreCountArgs} args - Arguments to filter AnimeGenres to count.
     * @example
     * // Count the number of AnimeGenres
     * const count = await prisma.animeGenre.count({
     *   where: {
     *     // ... the filter for the AnimeGenres we want to count
     *   }
     * })
    **/
    count<T extends AnimeGenreCountArgs>(
      args?: Subset<T, AnimeGenreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnimeGenreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AnimeGenre.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeGenreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnimeGenreAggregateArgs>(args: Subset<T, AnimeGenreAggregateArgs>): Prisma.PrismaPromise<GetAnimeGenreAggregateType<T>>

    /**
     * Group by AnimeGenre.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeGenreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnimeGenreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnimeGenreGroupByArgs['orderBy'] }
        : { orderBy?: AnimeGenreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnimeGenreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnimeGenreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AnimeGenre model
   */
  readonly fields: AnimeGenreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AnimeGenre.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnimeGenreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    anime<T extends AnimeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AnimeDefaultArgs<ExtArgs>>): Prisma__AnimeClient<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    genre<T extends GenreDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GenreDefaultArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AnimeGenre model
   */
  interface AnimeGenreFieldRefs {
    readonly animeId: FieldRef<"AnimeGenre", 'String'>
    readonly genreId: FieldRef<"AnimeGenre", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * AnimeGenre findUnique
   */
  export type AnimeGenreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimeGenre
     */
    select?: AnimeGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnimeGenre
     */
    omit?: AnimeGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeGenreInclude<ExtArgs> | null
    /**
     * Filter, which AnimeGenre to fetch.
     */
    where: AnimeGenreWhereUniqueInput
  }

  /**
   * AnimeGenre findUniqueOrThrow
   */
  export type AnimeGenreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimeGenre
     */
    select?: AnimeGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnimeGenre
     */
    omit?: AnimeGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeGenreInclude<ExtArgs> | null
    /**
     * Filter, which AnimeGenre to fetch.
     */
    where: AnimeGenreWhereUniqueInput
  }

  /**
   * AnimeGenre findFirst
   */
  export type AnimeGenreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimeGenre
     */
    select?: AnimeGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnimeGenre
     */
    omit?: AnimeGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeGenreInclude<ExtArgs> | null
    /**
     * Filter, which AnimeGenre to fetch.
     */
    where?: AnimeGenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnimeGenres to fetch.
     */
    orderBy?: AnimeGenreOrderByWithRelationInput | AnimeGenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnimeGenres.
     */
    cursor?: AnimeGenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnimeGenres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnimeGenres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnimeGenres.
     */
    distinct?: AnimeGenreScalarFieldEnum | AnimeGenreScalarFieldEnum[]
  }

  /**
   * AnimeGenre findFirstOrThrow
   */
  export type AnimeGenreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimeGenre
     */
    select?: AnimeGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnimeGenre
     */
    omit?: AnimeGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeGenreInclude<ExtArgs> | null
    /**
     * Filter, which AnimeGenre to fetch.
     */
    where?: AnimeGenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnimeGenres to fetch.
     */
    orderBy?: AnimeGenreOrderByWithRelationInput | AnimeGenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnimeGenres.
     */
    cursor?: AnimeGenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnimeGenres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnimeGenres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnimeGenres.
     */
    distinct?: AnimeGenreScalarFieldEnum | AnimeGenreScalarFieldEnum[]
  }

  /**
   * AnimeGenre findMany
   */
  export type AnimeGenreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimeGenre
     */
    select?: AnimeGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnimeGenre
     */
    omit?: AnimeGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeGenreInclude<ExtArgs> | null
    /**
     * Filter, which AnimeGenres to fetch.
     */
    where?: AnimeGenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnimeGenres to fetch.
     */
    orderBy?: AnimeGenreOrderByWithRelationInput | AnimeGenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AnimeGenres.
     */
    cursor?: AnimeGenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnimeGenres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnimeGenres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnimeGenres.
     */
    distinct?: AnimeGenreScalarFieldEnum | AnimeGenreScalarFieldEnum[]
  }

  /**
   * AnimeGenre create
   */
  export type AnimeGenreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimeGenre
     */
    select?: AnimeGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnimeGenre
     */
    omit?: AnimeGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeGenreInclude<ExtArgs> | null
    /**
     * The data needed to create a AnimeGenre.
     */
    data: XOR<AnimeGenreCreateInput, AnimeGenreUncheckedCreateInput>
  }

  /**
   * AnimeGenre createMany
   */
  export type AnimeGenreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AnimeGenres.
     */
    data: AnimeGenreCreateManyInput | AnimeGenreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AnimeGenre createManyAndReturn
   */
  export type AnimeGenreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimeGenre
     */
    select?: AnimeGenreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnimeGenre
     */
    omit?: AnimeGenreOmit<ExtArgs> | null
    /**
     * The data used to create many AnimeGenres.
     */
    data: AnimeGenreCreateManyInput | AnimeGenreCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeGenreIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AnimeGenre update
   */
  export type AnimeGenreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimeGenre
     */
    select?: AnimeGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnimeGenre
     */
    omit?: AnimeGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeGenreInclude<ExtArgs> | null
    /**
     * The data needed to update a AnimeGenre.
     */
    data: XOR<AnimeGenreUpdateInput, AnimeGenreUncheckedUpdateInput>
    /**
     * Choose, which AnimeGenre to update.
     */
    where: AnimeGenreWhereUniqueInput
  }

  /**
   * AnimeGenre updateMany
   */
  export type AnimeGenreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AnimeGenres.
     */
    data: XOR<AnimeGenreUpdateManyMutationInput, AnimeGenreUncheckedUpdateManyInput>
    /**
     * Filter which AnimeGenres to update
     */
    where?: AnimeGenreWhereInput
    /**
     * Limit how many AnimeGenres to update.
     */
    limit?: number
  }

  /**
   * AnimeGenre updateManyAndReturn
   */
  export type AnimeGenreUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimeGenre
     */
    select?: AnimeGenreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnimeGenre
     */
    omit?: AnimeGenreOmit<ExtArgs> | null
    /**
     * The data used to update AnimeGenres.
     */
    data: XOR<AnimeGenreUpdateManyMutationInput, AnimeGenreUncheckedUpdateManyInput>
    /**
     * Filter which AnimeGenres to update
     */
    where?: AnimeGenreWhereInput
    /**
     * Limit how many AnimeGenres to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeGenreIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AnimeGenre upsert
   */
  export type AnimeGenreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimeGenre
     */
    select?: AnimeGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnimeGenre
     */
    omit?: AnimeGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeGenreInclude<ExtArgs> | null
    /**
     * The filter to search for the AnimeGenre to update in case it exists.
     */
    where: AnimeGenreWhereUniqueInput
    /**
     * In case the AnimeGenre found by the `where` argument doesn't exist, create a new AnimeGenre with this data.
     */
    create: XOR<AnimeGenreCreateInput, AnimeGenreUncheckedCreateInput>
    /**
     * In case the AnimeGenre was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnimeGenreUpdateInput, AnimeGenreUncheckedUpdateInput>
  }

  /**
   * AnimeGenre delete
   */
  export type AnimeGenreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimeGenre
     */
    select?: AnimeGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnimeGenre
     */
    omit?: AnimeGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeGenreInclude<ExtArgs> | null
    /**
     * Filter which AnimeGenre to delete.
     */
    where: AnimeGenreWhereUniqueInput
  }

  /**
   * AnimeGenre deleteMany
   */
  export type AnimeGenreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnimeGenres to delete
     */
    where?: AnimeGenreWhereInput
    /**
     * Limit how many AnimeGenres to delete.
     */
    limit?: number
  }

  /**
   * AnimeGenre without action
   */
  export type AnimeGenreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimeGenre
     */
    select?: AnimeGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnimeGenre
     */
    omit?: AnimeGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeGenreInclude<ExtArgs> | null
  }


  /**
   * Model Episode
   */

  export type AggregateEpisode = {
    _count: EpisodeCountAggregateOutputType | null
    _avg: EpisodeAvgAggregateOutputType | null
    _sum: EpisodeSumAggregateOutputType | null
    _min: EpisodeMinAggregateOutputType | null
    _max: EpisodeMaxAggregateOutputType | null
  }

  export type EpisodeAvgAggregateOutputType = {
    episodeNumber: number | null
    durationSeconds: number | null
    viewCount: number | null
  }

  export type EpisodeSumAggregateOutputType = {
    episodeNumber: number | null
    durationSeconds: number | null
    viewCount: number | null
  }

  export type EpisodeMinAggregateOutputType = {
    id: string | null
    animeId: string | null
    episodeNumber: number | null
    title: string | null
    synopsis: string | null
    durationSeconds: number | null
    thumbnailKey: string | null
    airedAt: Date | null
    viewCount: number | null
    createdAt: Date | null
  }

  export type EpisodeMaxAggregateOutputType = {
    id: string | null
    animeId: string | null
    episodeNumber: number | null
    title: string | null
    synopsis: string | null
    durationSeconds: number | null
    thumbnailKey: string | null
    airedAt: Date | null
    viewCount: number | null
    createdAt: Date | null
  }

  export type EpisodeCountAggregateOutputType = {
    id: number
    animeId: number
    episodeNumber: number
    title: number
    synopsis: number
    durationSeconds: number
    thumbnailKey: number
    airedAt: number
    viewCount: number
    createdAt: number
    _all: number
  }


  export type EpisodeAvgAggregateInputType = {
    episodeNumber?: true
    durationSeconds?: true
    viewCount?: true
  }

  export type EpisodeSumAggregateInputType = {
    episodeNumber?: true
    durationSeconds?: true
    viewCount?: true
  }

  export type EpisodeMinAggregateInputType = {
    id?: true
    animeId?: true
    episodeNumber?: true
    title?: true
    synopsis?: true
    durationSeconds?: true
    thumbnailKey?: true
    airedAt?: true
    viewCount?: true
    createdAt?: true
  }

  export type EpisodeMaxAggregateInputType = {
    id?: true
    animeId?: true
    episodeNumber?: true
    title?: true
    synopsis?: true
    durationSeconds?: true
    thumbnailKey?: true
    airedAt?: true
    viewCount?: true
    createdAt?: true
  }

  export type EpisodeCountAggregateInputType = {
    id?: true
    animeId?: true
    episodeNumber?: true
    title?: true
    synopsis?: true
    durationSeconds?: true
    thumbnailKey?: true
    airedAt?: true
    viewCount?: true
    createdAt?: true
    _all?: true
  }

  export type EpisodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Episode to aggregate.
     */
    where?: EpisodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Episodes to fetch.
     */
    orderBy?: EpisodeOrderByWithRelationInput | EpisodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EpisodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Episodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Episodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Episodes
    **/
    _count?: true | EpisodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EpisodeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EpisodeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EpisodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EpisodeMaxAggregateInputType
  }

  export type GetEpisodeAggregateType<T extends EpisodeAggregateArgs> = {
        [P in keyof T & keyof AggregateEpisode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEpisode[P]>
      : GetScalarType<T[P], AggregateEpisode[P]>
  }




  export type EpisodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EpisodeWhereInput
    orderBy?: EpisodeOrderByWithAggregationInput | EpisodeOrderByWithAggregationInput[]
    by: EpisodeScalarFieldEnum[] | EpisodeScalarFieldEnum
    having?: EpisodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EpisodeCountAggregateInputType | true
    _avg?: EpisodeAvgAggregateInputType
    _sum?: EpisodeSumAggregateInputType
    _min?: EpisodeMinAggregateInputType
    _max?: EpisodeMaxAggregateInputType
  }

  export type EpisodeGroupByOutputType = {
    id: string
    animeId: string
    episodeNumber: number
    title: string | null
    synopsis: string | null
    durationSeconds: number | null
    thumbnailKey: string | null
    airedAt: Date | null
    viewCount: number
    createdAt: Date
    _count: EpisodeCountAggregateOutputType | null
    _avg: EpisodeAvgAggregateOutputType | null
    _sum: EpisodeSumAggregateOutputType | null
    _min: EpisodeMinAggregateOutputType | null
    _max: EpisodeMaxAggregateOutputType | null
  }

  type GetEpisodeGroupByPayload<T extends EpisodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EpisodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EpisodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EpisodeGroupByOutputType[P]>
            : GetScalarType<T[P], EpisodeGroupByOutputType[P]>
        }
      >
    >


  export type EpisodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    animeId?: boolean
    episodeNumber?: boolean
    title?: boolean
    synopsis?: boolean
    durationSeconds?: boolean
    thumbnailKey?: boolean
    airedAt?: boolean
    viewCount?: boolean
    createdAt?: boolean
    anime?: boolean | AnimeDefaultArgs<ExtArgs>
    videoSources?: boolean | Episode$videoSourcesArgs<ExtArgs>
    subtitles?: boolean | Episode$subtitlesArgs<ExtArgs>
    watchHistory?: boolean | Episode$watchHistoryArgs<ExtArgs>
    comments?: boolean | Episode$commentsArgs<ExtArgs>
    _count?: boolean | EpisodeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["episode"]>

  export type EpisodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    animeId?: boolean
    episodeNumber?: boolean
    title?: boolean
    synopsis?: boolean
    durationSeconds?: boolean
    thumbnailKey?: boolean
    airedAt?: boolean
    viewCount?: boolean
    createdAt?: boolean
    anime?: boolean | AnimeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["episode"]>

  export type EpisodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    animeId?: boolean
    episodeNumber?: boolean
    title?: boolean
    synopsis?: boolean
    durationSeconds?: boolean
    thumbnailKey?: boolean
    airedAt?: boolean
    viewCount?: boolean
    createdAt?: boolean
    anime?: boolean | AnimeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["episode"]>

  export type EpisodeSelectScalar = {
    id?: boolean
    animeId?: boolean
    episodeNumber?: boolean
    title?: boolean
    synopsis?: boolean
    durationSeconds?: boolean
    thumbnailKey?: boolean
    airedAt?: boolean
    viewCount?: boolean
    createdAt?: boolean
  }

  export type EpisodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "animeId" | "episodeNumber" | "title" | "synopsis" | "durationSeconds" | "thumbnailKey" | "airedAt" | "viewCount" | "createdAt", ExtArgs["result"]["episode"]>
  export type EpisodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    anime?: boolean | AnimeDefaultArgs<ExtArgs>
    videoSources?: boolean | Episode$videoSourcesArgs<ExtArgs>
    subtitles?: boolean | Episode$subtitlesArgs<ExtArgs>
    watchHistory?: boolean | Episode$watchHistoryArgs<ExtArgs>
    comments?: boolean | Episode$commentsArgs<ExtArgs>
    _count?: boolean | EpisodeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EpisodeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    anime?: boolean | AnimeDefaultArgs<ExtArgs>
  }
  export type EpisodeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    anime?: boolean | AnimeDefaultArgs<ExtArgs>
  }

  export type $EpisodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Episode"
    objects: {
      anime: Prisma.$AnimePayload<ExtArgs>
      videoSources: Prisma.$VideoSourcePayload<ExtArgs>[]
      subtitles: Prisma.$SubtitlePayload<ExtArgs>[]
      watchHistory: Prisma.$WatchHistoryPayload<ExtArgs>[]
      comments: Prisma.$CommentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      animeId: string
      episodeNumber: number
      title: string | null
      synopsis: string | null
      durationSeconds: number | null
      thumbnailKey: string | null
      airedAt: Date | null
      viewCount: number
      createdAt: Date
    }, ExtArgs["result"]["episode"]>
    composites: {}
  }

  type EpisodeGetPayload<S extends boolean | null | undefined | EpisodeDefaultArgs> = $Result.GetResult<Prisma.$EpisodePayload, S>

  type EpisodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EpisodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EpisodeCountAggregateInputType | true
    }

  export interface EpisodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Episode'], meta: { name: 'Episode' } }
    /**
     * Find zero or one Episode that matches the filter.
     * @param {EpisodeFindUniqueArgs} args - Arguments to find a Episode
     * @example
     * // Get one Episode
     * const episode = await prisma.episode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EpisodeFindUniqueArgs>(args: SelectSubset<T, EpisodeFindUniqueArgs<ExtArgs>>): Prisma__EpisodeClient<$Result.GetResult<Prisma.$EpisodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Episode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EpisodeFindUniqueOrThrowArgs} args - Arguments to find a Episode
     * @example
     * // Get one Episode
     * const episode = await prisma.episode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EpisodeFindUniqueOrThrowArgs>(args: SelectSubset<T, EpisodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EpisodeClient<$Result.GetResult<Prisma.$EpisodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Episode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EpisodeFindFirstArgs} args - Arguments to find a Episode
     * @example
     * // Get one Episode
     * const episode = await prisma.episode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EpisodeFindFirstArgs>(args?: SelectSubset<T, EpisodeFindFirstArgs<ExtArgs>>): Prisma__EpisodeClient<$Result.GetResult<Prisma.$EpisodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Episode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EpisodeFindFirstOrThrowArgs} args - Arguments to find a Episode
     * @example
     * // Get one Episode
     * const episode = await prisma.episode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EpisodeFindFirstOrThrowArgs>(args?: SelectSubset<T, EpisodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__EpisodeClient<$Result.GetResult<Prisma.$EpisodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Episodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EpisodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Episodes
     * const episodes = await prisma.episode.findMany()
     * 
     * // Get first 10 Episodes
     * const episodes = await prisma.episode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const episodeWithIdOnly = await prisma.episode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EpisodeFindManyArgs>(args?: SelectSubset<T, EpisodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EpisodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Episode.
     * @param {EpisodeCreateArgs} args - Arguments to create a Episode.
     * @example
     * // Create one Episode
     * const Episode = await prisma.episode.create({
     *   data: {
     *     // ... data to create a Episode
     *   }
     * })
     * 
     */
    create<T extends EpisodeCreateArgs>(args: SelectSubset<T, EpisodeCreateArgs<ExtArgs>>): Prisma__EpisodeClient<$Result.GetResult<Prisma.$EpisodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Episodes.
     * @param {EpisodeCreateManyArgs} args - Arguments to create many Episodes.
     * @example
     * // Create many Episodes
     * const episode = await prisma.episode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EpisodeCreateManyArgs>(args?: SelectSubset<T, EpisodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Episodes and returns the data saved in the database.
     * @param {EpisodeCreateManyAndReturnArgs} args - Arguments to create many Episodes.
     * @example
     * // Create many Episodes
     * const episode = await prisma.episode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Episodes and only return the `id`
     * const episodeWithIdOnly = await prisma.episode.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EpisodeCreateManyAndReturnArgs>(args?: SelectSubset<T, EpisodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EpisodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Episode.
     * @param {EpisodeDeleteArgs} args - Arguments to delete one Episode.
     * @example
     * // Delete one Episode
     * const Episode = await prisma.episode.delete({
     *   where: {
     *     // ... filter to delete one Episode
     *   }
     * })
     * 
     */
    delete<T extends EpisodeDeleteArgs>(args: SelectSubset<T, EpisodeDeleteArgs<ExtArgs>>): Prisma__EpisodeClient<$Result.GetResult<Prisma.$EpisodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Episode.
     * @param {EpisodeUpdateArgs} args - Arguments to update one Episode.
     * @example
     * // Update one Episode
     * const episode = await prisma.episode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EpisodeUpdateArgs>(args: SelectSubset<T, EpisodeUpdateArgs<ExtArgs>>): Prisma__EpisodeClient<$Result.GetResult<Prisma.$EpisodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Episodes.
     * @param {EpisodeDeleteManyArgs} args - Arguments to filter Episodes to delete.
     * @example
     * // Delete a few Episodes
     * const { count } = await prisma.episode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EpisodeDeleteManyArgs>(args?: SelectSubset<T, EpisodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Episodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EpisodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Episodes
     * const episode = await prisma.episode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EpisodeUpdateManyArgs>(args: SelectSubset<T, EpisodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Episodes and returns the data updated in the database.
     * @param {EpisodeUpdateManyAndReturnArgs} args - Arguments to update many Episodes.
     * @example
     * // Update many Episodes
     * const episode = await prisma.episode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Episodes and only return the `id`
     * const episodeWithIdOnly = await prisma.episode.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EpisodeUpdateManyAndReturnArgs>(args: SelectSubset<T, EpisodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EpisodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Episode.
     * @param {EpisodeUpsertArgs} args - Arguments to update or create a Episode.
     * @example
     * // Update or create a Episode
     * const episode = await prisma.episode.upsert({
     *   create: {
     *     // ... data to create a Episode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Episode we want to update
     *   }
     * })
     */
    upsert<T extends EpisodeUpsertArgs>(args: SelectSubset<T, EpisodeUpsertArgs<ExtArgs>>): Prisma__EpisodeClient<$Result.GetResult<Prisma.$EpisodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Episodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EpisodeCountArgs} args - Arguments to filter Episodes to count.
     * @example
     * // Count the number of Episodes
     * const count = await prisma.episode.count({
     *   where: {
     *     // ... the filter for the Episodes we want to count
     *   }
     * })
    **/
    count<T extends EpisodeCountArgs>(
      args?: Subset<T, EpisodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EpisodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Episode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EpisodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EpisodeAggregateArgs>(args: Subset<T, EpisodeAggregateArgs>): Prisma.PrismaPromise<GetEpisodeAggregateType<T>>

    /**
     * Group by Episode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EpisodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EpisodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EpisodeGroupByArgs['orderBy'] }
        : { orderBy?: EpisodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EpisodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEpisodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Episode model
   */
  readonly fields: EpisodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Episode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EpisodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    anime<T extends AnimeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AnimeDefaultArgs<ExtArgs>>): Prisma__AnimeClient<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    videoSources<T extends Episode$videoSourcesArgs<ExtArgs> = {}>(args?: Subset<T, Episode$videoSourcesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoSourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subtitles<T extends Episode$subtitlesArgs<ExtArgs> = {}>(args?: Subset<T, Episode$subtitlesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubtitlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    watchHistory<T extends Episode$watchHistoryArgs<ExtArgs> = {}>(args?: Subset<T, Episode$watchHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends Episode$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Episode$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Episode model
   */
  interface EpisodeFieldRefs {
    readonly id: FieldRef<"Episode", 'String'>
    readonly animeId: FieldRef<"Episode", 'String'>
    readonly episodeNumber: FieldRef<"Episode", 'Float'>
    readonly title: FieldRef<"Episode", 'String'>
    readonly synopsis: FieldRef<"Episode", 'String'>
    readonly durationSeconds: FieldRef<"Episode", 'Int'>
    readonly thumbnailKey: FieldRef<"Episode", 'String'>
    readonly airedAt: FieldRef<"Episode", 'DateTime'>
    readonly viewCount: FieldRef<"Episode", 'Int'>
    readonly createdAt: FieldRef<"Episode", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Episode findUnique
   */
  export type EpisodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Episode
     */
    select?: EpisodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Episode
     */
    omit?: EpisodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EpisodeInclude<ExtArgs> | null
    /**
     * Filter, which Episode to fetch.
     */
    where: EpisodeWhereUniqueInput
  }

  /**
   * Episode findUniqueOrThrow
   */
  export type EpisodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Episode
     */
    select?: EpisodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Episode
     */
    omit?: EpisodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EpisodeInclude<ExtArgs> | null
    /**
     * Filter, which Episode to fetch.
     */
    where: EpisodeWhereUniqueInput
  }

  /**
   * Episode findFirst
   */
  export type EpisodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Episode
     */
    select?: EpisodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Episode
     */
    omit?: EpisodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EpisodeInclude<ExtArgs> | null
    /**
     * Filter, which Episode to fetch.
     */
    where?: EpisodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Episodes to fetch.
     */
    orderBy?: EpisodeOrderByWithRelationInput | EpisodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Episodes.
     */
    cursor?: EpisodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Episodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Episodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Episodes.
     */
    distinct?: EpisodeScalarFieldEnum | EpisodeScalarFieldEnum[]
  }

  /**
   * Episode findFirstOrThrow
   */
  export type EpisodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Episode
     */
    select?: EpisodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Episode
     */
    omit?: EpisodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EpisodeInclude<ExtArgs> | null
    /**
     * Filter, which Episode to fetch.
     */
    where?: EpisodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Episodes to fetch.
     */
    orderBy?: EpisodeOrderByWithRelationInput | EpisodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Episodes.
     */
    cursor?: EpisodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Episodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Episodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Episodes.
     */
    distinct?: EpisodeScalarFieldEnum | EpisodeScalarFieldEnum[]
  }

  /**
   * Episode findMany
   */
  export type EpisodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Episode
     */
    select?: EpisodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Episode
     */
    omit?: EpisodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EpisodeInclude<ExtArgs> | null
    /**
     * Filter, which Episodes to fetch.
     */
    where?: EpisodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Episodes to fetch.
     */
    orderBy?: EpisodeOrderByWithRelationInput | EpisodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Episodes.
     */
    cursor?: EpisodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Episodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Episodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Episodes.
     */
    distinct?: EpisodeScalarFieldEnum | EpisodeScalarFieldEnum[]
  }

  /**
   * Episode create
   */
  export type EpisodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Episode
     */
    select?: EpisodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Episode
     */
    omit?: EpisodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EpisodeInclude<ExtArgs> | null
    /**
     * The data needed to create a Episode.
     */
    data: XOR<EpisodeCreateInput, EpisodeUncheckedCreateInput>
  }

  /**
   * Episode createMany
   */
  export type EpisodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Episodes.
     */
    data: EpisodeCreateManyInput | EpisodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Episode createManyAndReturn
   */
  export type EpisodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Episode
     */
    select?: EpisodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Episode
     */
    omit?: EpisodeOmit<ExtArgs> | null
    /**
     * The data used to create many Episodes.
     */
    data: EpisodeCreateManyInput | EpisodeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EpisodeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Episode update
   */
  export type EpisodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Episode
     */
    select?: EpisodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Episode
     */
    omit?: EpisodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EpisodeInclude<ExtArgs> | null
    /**
     * The data needed to update a Episode.
     */
    data: XOR<EpisodeUpdateInput, EpisodeUncheckedUpdateInput>
    /**
     * Choose, which Episode to update.
     */
    where: EpisodeWhereUniqueInput
  }

  /**
   * Episode updateMany
   */
  export type EpisodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Episodes.
     */
    data: XOR<EpisodeUpdateManyMutationInput, EpisodeUncheckedUpdateManyInput>
    /**
     * Filter which Episodes to update
     */
    where?: EpisodeWhereInput
    /**
     * Limit how many Episodes to update.
     */
    limit?: number
  }

  /**
   * Episode updateManyAndReturn
   */
  export type EpisodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Episode
     */
    select?: EpisodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Episode
     */
    omit?: EpisodeOmit<ExtArgs> | null
    /**
     * The data used to update Episodes.
     */
    data: XOR<EpisodeUpdateManyMutationInput, EpisodeUncheckedUpdateManyInput>
    /**
     * Filter which Episodes to update
     */
    where?: EpisodeWhereInput
    /**
     * Limit how many Episodes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EpisodeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Episode upsert
   */
  export type EpisodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Episode
     */
    select?: EpisodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Episode
     */
    omit?: EpisodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EpisodeInclude<ExtArgs> | null
    /**
     * The filter to search for the Episode to update in case it exists.
     */
    where: EpisodeWhereUniqueInput
    /**
     * In case the Episode found by the `where` argument doesn't exist, create a new Episode with this data.
     */
    create: XOR<EpisodeCreateInput, EpisodeUncheckedCreateInput>
    /**
     * In case the Episode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EpisodeUpdateInput, EpisodeUncheckedUpdateInput>
  }

  /**
   * Episode delete
   */
  export type EpisodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Episode
     */
    select?: EpisodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Episode
     */
    omit?: EpisodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EpisodeInclude<ExtArgs> | null
    /**
     * Filter which Episode to delete.
     */
    where: EpisodeWhereUniqueInput
  }

  /**
   * Episode deleteMany
   */
  export type EpisodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Episodes to delete
     */
    where?: EpisodeWhereInput
    /**
     * Limit how many Episodes to delete.
     */
    limit?: number
  }

  /**
   * Episode.videoSources
   */
  export type Episode$videoSourcesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoSource
     */
    select?: VideoSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoSource
     */
    omit?: VideoSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoSourceInclude<ExtArgs> | null
    where?: VideoSourceWhereInput
    orderBy?: VideoSourceOrderByWithRelationInput | VideoSourceOrderByWithRelationInput[]
    cursor?: VideoSourceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VideoSourceScalarFieldEnum | VideoSourceScalarFieldEnum[]
  }

  /**
   * Episode.subtitles
   */
  export type Episode$subtitlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtitle
     */
    select?: SubtitleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtitle
     */
    omit?: SubtitleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtitleInclude<ExtArgs> | null
    where?: SubtitleWhereInput
    orderBy?: SubtitleOrderByWithRelationInput | SubtitleOrderByWithRelationInput[]
    cursor?: SubtitleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubtitleScalarFieldEnum | SubtitleScalarFieldEnum[]
  }

  /**
   * Episode.watchHistory
   */
  export type Episode$watchHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchHistory
     */
    select?: WatchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchHistory
     */
    omit?: WatchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchHistoryInclude<ExtArgs> | null
    where?: WatchHistoryWhereInput
    orderBy?: WatchHistoryOrderByWithRelationInput | WatchHistoryOrderByWithRelationInput[]
    cursor?: WatchHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WatchHistoryScalarFieldEnum | WatchHistoryScalarFieldEnum[]
  }

  /**
   * Episode.comments
   */
  export type Episode$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Episode without action
   */
  export type EpisodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Episode
     */
    select?: EpisodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Episode
     */
    omit?: EpisodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EpisodeInclude<ExtArgs> | null
  }


  /**
   * Model VideoSource
   */

  export type AggregateVideoSource = {
    _count: VideoSourceCountAggregateOutputType | null
    _avg: VideoSourceAvgAggregateOutputType | null
    _sum: VideoSourceSumAggregateOutputType | null
    _min: VideoSourceMinAggregateOutputType | null
    _max: VideoSourceMaxAggregateOutputType | null
  }

  export type VideoSourceAvgAggregateOutputType = {
    fileSize: number | null
  }

  export type VideoSourceSumAggregateOutputType = {
    fileSize: number | null
  }

  export type VideoSourceMinAggregateOutputType = {
    id: string | null
    episodeId: string | null
    quality: $Enums.VideoQuality | null
    format: $Enums.VideoFormat | null
    r2Key: string | null
    url: string | null
    fileSize: number | null
    isPrimary: boolean | null
    createdAt: Date | null
  }

  export type VideoSourceMaxAggregateOutputType = {
    id: string | null
    episodeId: string | null
    quality: $Enums.VideoQuality | null
    format: $Enums.VideoFormat | null
    r2Key: string | null
    url: string | null
    fileSize: number | null
    isPrimary: boolean | null
    createdAt: Date | null
  }

  export type VideoSourceCountAggregateOutputType = {
    id: number
    episodeId: number
    quality: number
    format: number
    r2Key: number
    url: number
    fileSize: number
    isPrimary: number
    createdAt: number
    _all: number
  }


  export type VideoSourceAvgAggregateInputType = {
    fileSize?: true
  }

  export type VideoSourceSumAggregateInputType = {
    fileSize?: true
  }

  export type VideoSourceMinAggregateInputType = {
    id?: true
    episodeId?: true
    quality?: true
    format?: true
    r2Key?: true
    url?: true
    fileSize?: true
    isPrimary?: true
    createdAt?: true
  }

  export type VideoSourceMaxAggregateInputType = {
    id?: true
    episodeId?: true
    quality?: true
    format?: true
    r2Key?: true
    url?: true
    fileSize?: true
    isPrimary?: true
    createdAt?: true
  }

  export type VideoSourceCountAggregateInputType = {
    id?: true
    episodeId?: true
    quality?: true
    format?: true
    r2Key?: true
    url?: true
    fileSize?: true
    isPrimary?: true
    createdAt?: true
    _all?: true
  }

  export type VideoSourceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VideoSource to aggregate.
     */
    where?: VideoSourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoSources to fetch.
     */
    orderBy?: VideoSourceOrderByWithRelationInput | VideoSourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VideoSourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoSources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoSources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VideoSources
    **/
    _count?: true | VideoSourceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VideoSourceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VideoSourceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VideoSourceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VideoSourceMaxAggregateInputType
  }

  export type GetVideoSourceAggregateType<T extends VideoSourceAggregateArgs> = {
        [P in keyof T & keyof AggregateVideoSource]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVideoSource[P]>
      : GetScalarType<T[P], AggregateVideoSource[P]>
  }




  export type VideoSourceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VideoSourceWhereInput
    orderBy?: VideoSourceOrderByWithAggregationInput | VideoSourceOrderByWithAggregationInput[]
    by: VideoSourceScalarFieldEnum[] | VideoSourceScalarFieldEnum
    having?: VideoSourceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VideoSourceCountAggregateInputType | true
    _avg?: VideoSourceAvgAggregateInputType
    _sum?: VideoSourceSumAggregateInputType
    _min?: VideoSourceMinAggregateInputType
    _max?: VideoSourceMaxAggregateInputType
  }

  export type VideoSourceGroupByOutputType = {
    id: string
    episodeId: string
    quality: $Enums.VideoQuality
    format: $Enums.VideoFormat
    r2Key: string
    url: string | null
    fileSize: number | null
    isPrimary: boolean
    createdAt: Date
    _count: VideoSourceCountAggregateOutputType | null
    _avg: VideoSourceAvgAggregateOutputType | null
    _sum: VideoSourceSumAggregateOutputType | null
    _min: VideoSourceMinAggregateOutputType | null
    _max: VideoSourceMaxAggregateOutputType | null
  }

  type GetVideoSourceGroupByPayload<T extends VideoSourceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VideoSourceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VideoSourceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VideoSourceGroupByOutputType[P]>
            : GetScalarType<T[P], VideoSourceGroupByOutputType[P]>
        }
      >
    >


  export type VideoSourceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    episodeId?: boolean
    quality?: boolean
    format?: boolean
    r2Key?: boolean
    url?: boolean
    fileSize?: boolean
    isPrimary?: boolean
    createdAt?: boolean
    episode?: boolean | EpisodeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["videoSource"]>

  export type VideoSourceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    episodeId?: boolean
    quality?: boolean
    format?: boolean
    r2Key?: boolean
    url?: boolean
    fileSize?: boolean
    isPrimary?: boolean
    createdAt?: boolean
    episode?: boolean | EpisodeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["videoSource"]>

  export type VideoSourceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    episodeId?: boolean
    quality?: boolean
    format?: boolean
    r2Key?: boolean
    url?: boolean
    fileSize?: boolean
    isPrimary?: boolean
    createdAt?: boolean
    episode?: boolean | EpisodeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["videoSource"]>

  export type VideoSourceSelectScalar = {
    id?: boolean
    episodeId?: boolean
    quality?: boolean
    format?: boolean
    r2Key?: boolean
    url?: boolean
    fileSize?: boolean
    isPrimary?: boolean
    createdAt?: boolean
  }

  export type VideoSourceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "episodeId" | "quality" | "format" | "r2Key" | "url" | "fileSize" | "isPrimary" | "createdAt", ExtArgs["result"]["videoSource"]>
  export type VideoSourceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    episode?: boolean | EpisodeDefaultArgs<ExtArgs>
  }
  export type VideoSourceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    episode?: boolean | EpisodeDefaultArgs<ExtArgs>
  }
  export type VideoSourceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    episode?: boolean | EpisodeDefaultArgs<ExtArgs>
  }

  export type $VideoSourcePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VideoSource"
    objects: {
      episode: Prisma.$EpisodePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      episodeId: string
      quality: $Enums.VideoQuality
      format: $Enums.VideoFormat
      r2Key: string
      url: string | null
      fileSize: number | null
      isPrimary: boolean
      createdAt: Date
    }, ExtArgs["result"]["videoSource"]>
    composites: {}
  }

  type VideoSourceGetPayload<S extends boolean | null | undefined | VideoSourceDefaultArgs> = $Result.GetResult<Prisma.$VideoSourcePayload, S>

  type VideoSourceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VideoSourceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VideoSourceCountAggregateInputType | true
    }

  export interface VideoSourceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VideoSource'], meta: { name: 'VideoSource' } }
    /**
     * Find zero or one VideoSource that matches the filter.
     * @param {VideoSourceFindUniqueArgs} args - Arguments to find a VideoSource
     * @example
     * // Get one VideoSource
     * const videoSource = await prisma.videoSource.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VideoSourceFindUniqueArgs>(args: SelectSubset<T, VideoSourceFindUniqueArgs<ExtArgs>>): Prisma__VideoSourceClient<$Result.GetResult<Prisma.$VideoSourcePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VideoSource that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VideoSourceFindUniqueOrThrowArgs} args - Arguments to find a VideoSource
     * @example
     * // Get one VideoSource
     * const videoSource = await prisma.videoSource.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VideoSourceFindUniqueOrThrowArgs>(args: SelectSubset<T, VideoSourceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VideoSourceClient<$Result.GetResult<Prisma.$VideoSourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VideoSource that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoSourceFindFirstArgs} args - Arguments to find a VideoSource
     * @example
     * // Get one VideoSource
     * const videoSource = await prisma.videoSource.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VideoSourceFindFirstArgs>(args?: SelectSubset<T, VideoSourceFindFirstArgs<ExtArgs>>): Prisma__VideoSourceClient<$Result.GetResult<Prisma.$VideoSourcePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VideoSource that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoSourceFindFirstOrThrowArgs} args - Arguments to find a VideoSource
     * @example
     * // Get one VideoSource
     * const videoSource = await prisma.videoSource.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VideoSourceFindFirstOrThrowArgs>(args?: SelectSubset<T, VideoSourceFindFirstOrThrowArgs<ExtArgs>>): Prisma__VideoSourceClient<$Result.GetResult<Prisma.$VideoSourcePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VideoSources that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoSourceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VideoSources
     * const videoSources = await prisma.videoSource.findMany()
     * 
     * // Get first 10 VideoSources
     * const videoSources = await prisma.videoSource.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const videoSourceWithIdOnly = await prisma.videoSource.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VideoSourceFindManyArgs>(args?: SelectSubset<T, VideoSourceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoSourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VideoSource.
     * @param {VideoSourceCreateArgs} args - Arguments to create a VideoSource.
     * @example
     * // Create one VideoSource
     * const VideoSource = await prisma.videoSource.create({
     *   data: {
     *     // ... data to create a VideoSource
     *   }
     * })
     * 
     */
    create<T extends VideoSourceCreateArgs>(args: SelectSubset<T, VideoSourceCreateArgs<ExtArgs>>): Prisma__VideoSourceClient<$Result.GetResult<Prisma.$VideoSourcePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VideoSources.
     * @param {VideoSourceCreateManyArgs} args - Arguments to create many VideoSources.
     * @example
     * // Create many VideoSources
     * const videoSource = await prisma.videoSource.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VideoSourceCreateManyArgs>(args?: SelectSubset<T, VideoSourceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VideoSources and returns the data saved in the database.
     * @param {VideoSourceCreateManyAndReturnArgs} args - Arguments to create many VideoSources.
     * @example
     * // Create many VideoSources
     * const videoSource = await prisma.videoSource.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VideoSources and only return the `id`
     * const videoSourceWithIdOnly = await prisma.videoSource.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VideoSourceCreateManyAndReturnArgs>(args?: SelectSubset<T, VideoSourceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoSourcePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VideoSource.
     * @param {VideoSourceDeleteArgs} args - Arguments to delete one VideoSource.
     * @example
     * // Delete one VideoSource
     * const VideoSource = await prisma.videoSource.delete({
     *   where: {
     *     // ... filter to delete one VideoSource
     *   }
     * })
     * 
     */
    delete<T extends VideoSourceDeleteArgs>(args: SelectSubset<T, VideoSourceDeleteArgs<ExtArgs>>): Prisma__VideoSourceClient<$Result.GetResult<Prisma.$VideoSourcePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VideoSource.
     * @param {VideoSourceUpdateArgs} args - Arguments to update one VideoSource.
     * @example
     * // Update one VideoSource
     * const videoSource = await prisma.videoSource.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VideoSourceUpdateArgs>(args: SelectSubset<T, VideoSourceUpdateArgs<ExtArgs>>): Prisma__VideoSourceClient<$Result.GetResult<Prisma.$VideoSourcePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VideoSources.
     * @param {VideoSourceDeleteManyArgs} args - Arguments to filter VideoSources to delete.
     * @example
     * // Delete a few VideoSources
     * const { count } = await prisma.videoSource.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VideoSourceDeleteManyArgs>(args?: SelectSubset<T, VideoSourceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VideoSources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoSourceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VideoSources
     * const videoSource = await prisma.videoSource.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VideoSourceUpdateManyArgs>(args: SelectSubset<T, VideoSourceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VideoSources and returns the data updated in the database.
     * @param {VideoSourceUpdateManyAndReturnArgs} args - Arguments to update many VideoSources.
     * @example
     * // Update many VideoSources
     * const videoSource = await prisma.videoSource.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VideoSources and only return the `id`
     * const videoSourceWithIdOnly = await prisma.videoSource.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VideoSourceUpdateManyAndReturnArgs>(args: SelectSubset<T, VideoSourceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoSourcePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VideoSource.
     * @param {VideoSourceUpsertArgs} args - Arguments to update or create a VideoSource.
     * @example
     * // Update or create a VideoSource
     * const videoSource = await prisma.videoSource.upsert({
     *   create: {
     *     // ... data to create a VideoSource
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VideoSource we want to update
     *   }
     * })
     */
    upsert<T extends VideoSourceUpsertArgs>(args: SelectSubset<T, VideoSourceUpsertArgs<ExtArgs>>): Prisma__VideoSourceClient<$Result.GetResult<Prisma.$VideoSourcePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VideoSources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoSourceCountArgs} args - Arguments to filter VideoSources to count.
     * @example
     * // Count the number of VideoSources
     * const count = await prisma.videoSource.count({
     *   where: {
     *     // ... the filter for the VideoSources we want to count
     *   }
     * })
    **/
    count<T extends VideoSourceCountArgs>(
      args?: Subset<T, VideoSourceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VideoSourceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VideoSource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoSourceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VideoSourceAggregateArgs>(args: Subset<T, VideoSourceAggregateArgs>): Prisma.PrismaPromise<GetVideoSourceAggregateType<T>>

    /**
     * Group by VideoSource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoSourceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VideoSourceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VideoSourceGroupByArgs['orderBy'] }
        : { orderBy?: VideoSourceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VideoSourceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVideoSourceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VideoSource model
   */
  readonly fields: VideoSourceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VideoSource.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VideoSourceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    episode<T extends EpisodeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EpisodeDefaultArgs<ExtArgs>>): Prisma__EpisodeClient<$Result.GetResult<Prisma.$EpisodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VideoSource model
   */
  interface VideoSourceFieldRefs {
    readonly id: FieldRef<"VideoSource", 'String'>
    readonly episodeId: FieldRef<"VideoSource", 'String'>
    readonly quality: FieldRef<"VideoSource", 'VideoQuality'>
    readonly format: FieldRef<"VideoSource", 'VideoFormat'>
    readonly r2Key: FieldRef<"VideoSource", 'String'>
    readonly url: FieldRef<"VideoSource", 'String'>
    readonly fileSize: FieldRef<"VideoSource", 'Int'>
    readonly isPrimary: FieldRef<"VideoSource", 'Boolean'>
    readonly createdAt: FieldRef<"VideoSource", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VideoSource findUnique
   */
  export type VideoSourceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoSource
     */
    select?: VideoSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoSource
     */
    omit?: VideoSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoSourceInclude<ExtArgs> | null
    /**
     * Filter, which VideoSource to fetch.
     */
    where: VideoSourceWhereUniqueInput
  }

  /**
   * VideoSource findUniqueOrThrow
   */
  export type VideoSourceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoSource
     */
    select?: VideoSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoSource
     */
    omit?: VideoSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoSourceInclude<ExtArgs> | null
    /**
     * Filter, which VideoSource to fetch.
     */
    where: VideoSourceWhereUniqueInput
  }

  /**
   * VideoSource findFirst
   */
  export type VideoSourceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoSource
     */
    select?: VideoSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoSource
     */
    omit?: VideoSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoSourceInclude<ExtArgs> | null
    /**
     * Filter, which VideoSource to fetch.
     */
    where?: VideoSourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoSources to fetch.
     */
    orderBy?: VideoSourceOrderByWithRelationInput | VideoSourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VideoSources.
     */
    cursor?: VideoSourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoSources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoSources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VideoSources.
     */
    distinct?: VideoSourceScalarFieldEnum | VideoSourceScalarFieldEnum[]
  }

  /**
   * VideoSource findFirstOrThrow
   */
  export type VideoSourceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoSource
     */
    select?: VideoSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoSource
     */
    omit?: VideoSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoSourceInclude<ExtArgs> | null
    /**
     * Filter, which VideoSource to fetch.
     */
    where?: VideoSourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoSources to fetch.
     */
    orderBy?: VideoSourceOrderByWithRelationInput | VideoSourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VideoSources.
     */
    cursor?: VideoSourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoSources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoSources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VideoSources.
     */
    distinct?: VideoSourceScalarFieldEnum | VideoSourceScalarFieldEnum[]
  }

  /**
   * VideoSource findMany
   */
  export type VideoSourceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoSource
     */
    select?: VideoSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoSource
     */
    omit?: VideoSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoSourceInclude<ExtArgs> | null
    /**
     * Filter, which VideoSources to fetch.
     */
    where?: VideoSourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoSources to fetch.
     */
    orderBy?: VideoSourceOrderByWithRelationInput | VideoSourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VideoSources.
     */
    cursor?: VideoSourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoSources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoSources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VideoSources.
     */
    distinct?: VideoSourceScalarFieldEnum | VideoSourceScalarFieldEnum[]
  }

  /**
   * VideoSource create
   */
  export type VideoSourceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoSource
     */
    select?: VideoSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoSource
     */
    omit?: VideoSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoSourceInclude<ExtArgs> | null
    /**
     * The data needed to create a VideoSource.
     */
    data: XOR<VideoSourceCreateInput, VideoSourceUncheckedCreateInput>
  }

  /**
   * VideoSource createMany
   */
  export type VideoSourceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VideoSources.
     */
    data: VideoSourceCreateManyInput | VideoSourceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VideoSource createManyAndReturn
   */
  export type VideoSourceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoSource
     */
    select?: VideoSourceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VideoSource
     */
    omit?: VideoSourceOmit<ExtArgs> | null
    /**
     * The data used to create many VideoSources.
     */
    data: VideoSourceCreateManyInput | VideoSourceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoSourceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VideoSource update
   */
  export type VideoSourceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoSource
     */
    select?: VideoSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoSource
     */
    omit?: VideoSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoSourceInclude<ExtArgs> | null
    /**
     * The data needed to update a VideoSource.
     */
    data: XOR<VideoSourceUpdateInput, VideoSourceUncheckedUpdateInput>
    /**
     * Choose, which VideoSource to update.
     */
    where: VideoSourceWhereUniqueInput
  }

  /**
   * VideoSource updateMany
   */
  export type VideoSourceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VideoSources.
     */
    data: XOR<VideoSourceUpdateManyMutationInput, VideoSourceUncheckedUpdateManyInput>
    /**
     * Filter which VideoSources to update
     */
    where?: VideoSourceWhereInput
    /**
     * Limit how many VideoSources to update.
     */
    limit?: number
  }

  /**
   * VideoSource updateManyAndReturn
   */
  export type VideoSourceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoSource
     */
    select?: VideoSourceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VideoSource
     */
    omit?: VideoSourceOmit<ExtArgs> | null
    /**
     * The data used to update VideoSources.
     */
    data: XOR<VideoSourceUpdateManyMutationInput, VideoSourceUncheckedUpdateManyInput>
    /**
     * Filter which VideoSources to update
     */
    where?: VideoSourceWhereInput
    /**
     * Limit how many VideoSources to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoSourceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VideoSource upsert
   */
  export type VideoSourceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoSource
     */
    select?: VideoSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoSource
     */
    omit?: VideoSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoSourceInclude<ExtArgs> | null
    /**
     * The filter to search for the VideoSource to update in case it exists.
     */
    where: VideoSourceWhereUniqueInput
    /**
     * In case the VideoSource found by the `where` argument doesn't exist, create a new VideoSource with this data.
     */
    create: XOR<VideoSourceCreateInput, VideoSourceUncheckedCreateInput>
    /**
     * In case the VideoSource was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VideoSourceUpdateInput, VideoSourceUncheckedUpdateInput>
  }

  /**
   * VideoSource delete
   */
  export type VideoSourceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoSource
     */
    select?: VideoSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoSource
     */
    omit?: VideoSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoSourceInclude<ExtArgs> | null
    /**
     * Filter which VideoSource to delete.
     */
    where: VideoSourceWhereUniqueInput
  }

  /**
   * VideoSource deleteMany
   */
  export type VideoSourceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VideoSources to delete
     */
    where?: VideoSourceWhereInput
    /**
     * Limit how many VideoSources to delete.
     */
    limit?: number
  }

  /**
   * VideoSource without action
   */
  export type VideoSourceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoSource
     */
    select?: VideoSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoSource
     */
    omit?: VideoSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VideoSourceInclude<ExtArgs> | null
  }


  /**
   * Model Subtitle
   */

  export type AggregateSubtitle = {
    _count: SubtitleCountAggregateOutputType | null
    _min: SubtitleMinAggregateOutputType | null
    _max: SubtitleMaxAggregateOutputType | null
  }

  export type SubtitleMinAggregateOutputType = {
    id: string | null
    episodeId: string | null
    language: string | null
    label: string | null
    r2Key: string | null
    createdAt: Date | null
  }

  export type SubtitleMaxAggregateOutputType = {
    id: string | null
    episodeId: string | null
    language: string | null
    label: string | null
    r2Key: string | null
    createdAt: Date | null
  }

  export type SubtitleCountAggregateOutputType = {
    id: number
    episodeId: number
    language: number
    label: number
    r2Key: number
    createdAt: number
    _all: number
  }


  export type SubtitleMinAggregateInputType = {
    id?: true
    episodeId?: true
    language?: true
    label?: true
    r2Key?: true
    createdAt?: true
  }

  export type SubtitleMaxAggregateInputType = {
    id?: true
    episodeId?: true
    language?: true
    label?: true
    r2Key?: true
    createdAt?: true
  }

  export type SubtitleCountAggregateInputType = {
    id?: true
    episodeId?: true
    language?: true
    label?: true
    r2Key?: true
    createdAt?: true
    _all?: true
  }

  export type SubtitleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subtitle to aggregate.
     */
    where?: SubtitleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subtitles to fetch.
     */
    orderBy?: SubtitleOrderByWithRelationInput | SubtitleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubtitleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subtitles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subtitles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subtitles
    **/
    _count?: true | SubtitleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubtitleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubtitleMaxAggregateInputType
  }

  export type GetSubtitleAggregateType<T extends SubtitleAggregateArgs> = {
        [P in keyof T & keyof AggregateSubtitle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubtitle[P]>
      : GetScalarType<T[P], AggregateSubtitle[P]>
  }




  export type SubtitleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubtitleWhereInput
    orderBy?: SubtitleOrderByWithAggregationInput | SubtitleOrderByWithAggregationInput[]
    by: SubtitleScalarFieldEnum[] | SubtitleScalarFieldEnum
    having?: SubtitleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubtitleCountAggregateInputType | true
    _min?: SubtitleMinAggregateInputType
    _max?: SubtitleMaxAggregateInputType
  }

  export type SubtitleGroupByOutputType = {
    id: string
    episodeId: string
    language: string
    label: string
    r2Key: string
    createdAt: Date
    _count: SubtitleCountAggregateOutputType | null
    _min: SubtitleMinAggregateOutputType | null
    _max: SubtitleMaxAggregateOutputType | null
  }

  type GetSubtitleGroupByPayload<T extends SubtitleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubtitleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubtitleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubtitleGroupByOutputType[P]>
            : GetScalarType<T[P], SubtitleGroupByOutputType[P]>
        }
      >
    >


  export type SubtitleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    episodeId?: boolean
    language?: boolean
    label?: boolean
    r2Key?: boolean
    createdAt?: boolean
    episode?: boolean | EpisodeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subtitle"]>

  export type SubtitleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    episodeId?: boolean
    language?: boolean
    label?: boolean
    r2Key?: boolean
    createdAt?: boolean
    episode?: boolean | EpisodeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subtitle"]>

  export type SubtitleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    episodeId?: boolean
    language?: boolean
    label?: boolean
    r2Key?: boolean
    createdAt?: boolean
    episode?: boolean | EpisodeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subtitle"]>

  export type SubtitleSelectScalar = {
    id?: boolean
    episodeId?: boolean
    language?: boolean
    label?: boolean
    r2Key?: boolean
    createdAt?: boolean
  }

  export type SubtitleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "episodeId" | "language" | "label" | "r2Key" | "createdAt", ExtArgs["result"]["subtitle"]>
  export type SubtitleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    episode?: boolean | EpisodeDefaultArgs<ExtArgs>
  }
  export type SubtitleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    episode?: boolean | EpisodeDefaultArgs<ExtArgs>
  }
  export type SubtitleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    episode?: boolean | EpisodeDefaultArgs<ExtArgs>
  }

  export type $SubtitlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subtitle"
    objects: {
      episode: Prisma.$EpisodePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      episodeId: string
      language: string
      label: string
      r2Key: string
      createdAt: Date
    }, ExtArgs["result"]["subtitle"]>
    composites: {}
  }

  type SubtitleGetPayload<S extends boolean | null | undefined | SubtitleDefaultArgs> = $Result.GetResult<Prisma.$SubtitlePayload, S>

  type SubtitleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubtitleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubtitleCountAggregateInputType | true
    }

  export interface SubtitleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subtitle'], meta: { name: 'Subtitle' } }
    /**
     * Find zero or one Subtitle that matches the filter.
     * @param {SubtitleFindUniqueArgs} args - Arguments to find a Subtitle
     * @example
     * // Get one Subtitle
     * const subtitle = await prisma.subtitle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubtitleFindUniqueArgs>(args: SelectSubset<T, SubtitleFindUniqueArgs<ExtArgs>>): Prisma__SubtitleClient<$Result.GetResult<Prisma.$SubtitlePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subtitle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubtitleFindUniqueOrThrowArgs} args - Arguments to find a Subtitle
     * @example
     * // Get one Subtitle
     * const subtitle = await prisma.subtitle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubtitleFindUniqueOrThrowArgs>(args: SelectSubset<T, SubtitleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubtitleClient<$Result.GetResult<Prisma.$SubtitlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subtitle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtitleFindFirstArgs} args - Arguments to find a Subtitle
     * @example
     * // Get one Subtitle
     * const subtitle = await prisma.subtitle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubtitleFindFirstArgs>(args?: SelectSubset<T, SubtitleFindFirstArgs<ExtArgs>>): Prisma__SubtitleClient<$Result.GetResult<Prisma.$SubtitlePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subtitle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtitleFindFirstOrThrowArgs} args - Arguments to find a Subtitle
     * @example
     * // Get one Subtitle
     * const subtitle = await prisma.subtitle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubtitleFindFirstOrThrowArgs>(args?: SelectSubset<T, SubtitleFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubtitleClient<$Result.GetResult<Prisma.$SubtitlePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subtitles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtitleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subtitles
     * const subtitles = await prisma.subtitle.findMany()
     * 
     * // Get first 10 Subtitles
     * const subtitles = await prisma.subtitle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subtitleWithIdOnly = await prisma.subtitle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubtitleFindManyArgs>(args?: SelectSubset<T, SubtitleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubtitlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subtitle.
     * @param {SubtitleCreateArgs} args - Arguments to create a Subtitle.
     * @example
     * // Create one Subtitle
     * const Subtitle = await prisma.subtitle.create({
     *   data: {
     *     // ... data to create a Subtitle
     *   }
     * })
     * 
     */
    create<T extends SubtitleCreateArgs>(args: SelectSubset<T, SubtitleCreateArgs<ExtArgs>>): Prisma__SubtitleClient<$Result.GetResult<Prisma.$SubtitlePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subtitles.
     * @param {SubtitleCreateManyArgs} args - Arguments to create many Subtitles.
     * @example
     * // Create many Subtitles
     * const subtitle = await prisma.subtitle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubtitleCreateManyArgs>(args?: SelectSubset<T, SubtitleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subtitles and returns the data saved in the database.
     * @param {SubtitleCreateManyAndReturnArgs} args - Arguments to create many Subtitles.
     * @example
     * // Create many Subtitles
     * const subtitle = await prisma.subtitle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subtitles and only return the `id`
     * const subtitleWithIdOnly = await prisma.subtitle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubtitleCreateManyAndReturnArgs>(args?: SelectSubset<T, SubtitleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubtitlePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subtitle.
     * @param {SubtitleDeleteArgs} args - Arguments to delete one Subtitle.
     * @example
     * // Delete one Subtitle
     * const Subtitle = await prisma.subtitle.delete({
     *   where: {
     *     // ... filter to delete one Subtitle
     *   }
     * })
     * 
     */
    delete<T extends SubtitleDeleteArgs>(args: SelectSubset<T, SubtitleDeleteArgs<ExtArgs>>): Prisma__SubtitleClient<$Result.GetResult<Prisma.$SubtitlePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subtitle.
     * @param {SubtitleUpdateArgs} args - Arguments to update one Subtitle.
     * @example
     * // Update one Subtitle
     * const subtitle = await prisma.subtitle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubtitleUpdateArgs>(args: SelectSubset<T, SubtitleUpdateArgs<ExtArgs>>): Prisma__SubtitleClient<$Result.GetResult<Prisma.$SubtitlePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subtitles.
     * @param {SubtitleDeleteManyArgs} args - Arguments to filter Subtitles to delete.
     * @example
     * // Delete a few Subtitles
     * const { count } = await prisma.subtitle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubtitleDeleteManyArgs>(args?: SelectSubset<T, SubtitleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subtitles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtitleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subtitles
     * const subtitle = await prisma.subtitle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubtitleUpdateManyArgs>(args: SelectSubset<T, SubtitleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subtitles and returns the data updated in the database.
     * @param {SubtitleUpdateManyAndReturnArgs} args - Arguments to update many Subtitles.
     * @example
     * // Update many Subtitles
     * const subtitle = await prisma.subtitle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subtitles and only return the `id`
     * const subtitleWithIdOnly = await prisma.subtitle.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubtitleUpdateManyAndReturnArgs>(args: SelectSubset<T, SubtitleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubtitlePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subtitle.
     * @param {SubtitleUpsertArgs} args - Arguments to update or create a Subtitle.
     * @example
     * // Update or create a Subtitle
     * const subtitle = await prisma.subtitle.upsert({
     *   create: {
     *     // ... data to create a Subtitle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subtitle we want to update
     *   }
     * })
     */
    upsert<T extends SubtitleUpsertArgs>(args: SelectSubset<T, SubtitleUpsertArgs<ExtArgs>>): Prisma__SubtitleClient<$Result.GetResult<Prisma.$SubtitlePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subtitles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtitleCountArgs} args - Arguments to filter Subtitles to count.
     * @example
     * // Count the number of Subtitles
     * const count = await prisma.subtitle.count({
     *   where: {
     *     // ... the filter for the Subtitles we want to count
     *   }
     * })
    **/
    count<T extends SubtitleCountArgs>(
      args?: Subset<T, SubtitleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubtitleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subtitle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtitleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubtitleAggregateArgs>(args: Subset<T, SubtitleAggregateArgs>): Prisma.PrismaPromise<GetSubtitleAggregateType<T>>

    /**
     * Group by Subtitle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtitleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubtitleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubtitleGroupByArgs['orderBy'] }
        : { orderBy?: SubtitleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubtitleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubtitleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subtitle model
   */
  readonly fields: SubtitleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subtitle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubtitleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    episode<T extends EpisodeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EpisodeDefaultArgs<ExtArgs>>): Prisma__EpisodeClient<$Result.GetResult<Prisma.$EpisodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Subtitle model
   */
  interface SubtitleFieldRefs {
    readonly id: FieldRef<"Subtitle", 'String'>
    readonly episodeId: FieldRef<"Subtitle", 'String'>
    readonly language: FieldRef<"Subtitle", 'String'>
    readonly label: FieldRef<"Subtitle", 'String'>
    readonly r2Key: FieldRef<"Subtitle", 'String'>
    readonly createdAt: FieldRef<"Subtitle", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Subtitle findUnique
   */
  export type SubtitleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtitle
     */
    select?: SubtitleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtitle
     */
    omit?: SubtitleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtitleInclude<ExtArgs> | null
    /**
     * Filter, which Subtitle to fetch.
     */
    where: SubtitleWhereUniqueInput
  }

  /**
   * Subtitle findUniqueOrThrow
   */
  export type SubtitleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtitle
     */
    select?: SubtitleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtitle
     */
    omit?: SubtitleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtitleInclude<ExtArgs> | null
    /**
     * Filter, which Subtitle to fetch.
     */
    where: SubtitleWhereUniqueInput
  }

  /**
   * Subtitle findFirst
   */
  export type SubtitleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtitle
     */
    select?: SubtitleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtitle
     */
    omit?: SubtitleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtitleInclude<ExtArgs> | null
    /**
     * Filter, which Subtitle to fetch.
     */
    where?: SubtitleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subtitles to fetch.
     */
    orderBy?: SubtitleOrderByWithRelationInput | SubtitleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subtitles.
     */
    cursor?: SubtitleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subtitles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subtitles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subtitles.
     */
    distinct?: SubtitleScalarFieldEnum | SubtitleScalarFieldEnum[]
  }

  /**
   * Subtitle findFirstOrThrow
   */
  export type SubtitleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtitle
     */
    select?: SubtitleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtitle
     */
    omit?: SubtitleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtitleInclude<ExtArgs> | null
    /**
     * Filter, which Subtitle to fetch.
     */
    where?: SubtitleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subtitles to fetch.
     */
    orderBy?: SubtitleOrderByWithRelationInput | SubtitleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subtitles.
     */
    cursor?: SubtitleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subtitles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subtitles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subtitles.
     */
    distinct?: SubtitleScalarFieldEnum | SubtitleScalarFieldEnum[]
  }

  /**
   * Subtitle findMany
   */
  export type SubtitleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtitle
     */
    select?: SubtitleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtitle
     */
    omit?: SubtitleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtitleInclude<ExtArgs> | null
    /**
     * Filter, which Subtitles to fetch.
     */
    where?: SubtitleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subtitles to fetch.
     */
    orderBy?: SubtitleOrderByWithRelationInput | SubtitleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subtitles.
     */
    cursor?: SubtitleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subtitles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subtitles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subtitles.
     */
    distinct?: SubtitleScalarFieldEnum | SubtitleScalarFieldEnum[]
  }

  /**
   * Subtitle create
   */
  export type SubtitleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtitle
     */
    select?: SubtitleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtitle
     */
    omit?: SubtitleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtitleInclude<ExtArgs> | null
    /**
     * The data needed to create a Subtitle.
     */
    data: XOR<SubtitleCreateInput, SubtitleUncheckedCreateInput>
  }

  /**
   * Subtitle createMany
   */
  export type SubtitleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subtitles.
     */
    data: SubtitleCreateManyInput | SubtitleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subtitle createManyAndReturn
   */
  export type SubtitleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtitle
     */
    select?: SubtitleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subtitle
     */
    omit?: SubtitleOmit<ExtArgs> | null
    /**
     * The data used to create many Subtitles.
     */
    data: SubtitleCreateManyInput | SubtitleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtitleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subtitle update
   */
  export type SubtitleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtitle
     */
    select?: SubtitleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtitle
     */
    omit?: SubtitleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtitleInclude<ExtArgs> | null
    /**
     * The data needed to update a Subtitle.
     */
    data: XOR<SubtitleUpdateInput, SubtitleUncheckedUpdateInput>
    /**
     * Choose, which Subtitle to update.
     */
    where: SubtitleWhereUniqueInput
  }

  /**
   * Subtitle updateMany
   */
  export type SubtitleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subtitles.
     */
    data: XOR<SubtitleUpdateManyMutationInput, SubtitleUncheckedUpdateManyInput>
    /**
     * Filter which Subtitles to update
     */
    where?: SubtitleWhereInput
    /**
     * Limit how many Subtitles to update.
     */
    limit?: number
  }

  /**
   * Subtitle updateManyAndReturn
   */
  export type SubtitleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtitle
     */
    select?: SubtitleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subtitle
     */
    omit?: SubtitleOmit<ExtArgs> | null
    /**
     * The data used to update Subtitles.
     */
    data: XOR<SubtitleUpdateManyMutationInput, SubtitleUncheckedUpdateManyInput>
    /**
     * Filter which Subtitles to update
     */
    where?: SubtitleWhereInput
    /**
     * Limit how many Subtitles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtitleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subtitle upsert
   */
  export type SubtitleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtitle
     */
    select?: SubtitleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtitle
     */
    omit?: SubtitleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtitleInclude<ExtArgs> | null
    /**
     * The filter to search for the Subtitle to update in case it exists.
     */
    where: SubtitleWhereUniqueInput
    /**
     * In case the Subtitle found by the `where` argument doesn't exist, create a new Subtitle with this data.
     */
    create: XOR<SubtitleCreateInput, SubtitleUncheckedCreateInput>
    /**
     * In case the Subtitle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubtitleUpdateInput, SubtitleUncheckedUpdateInput>
  }

  /**
   * Subtitle delete
   */
  export type SubtitleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtitle
     */
    select?: SubtitleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtitle
     */
    omit?: SubtitleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtitleInclude<ExtArgs> | null
    /**
     * Filter which Subtitle to delete.
     */
    where: SubtitleWhereUniqueInput
  }

  /**
   * Subtitle deleteMany
   */
  export type SubtitleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subtitles to delete
     */
    where?: SubtitleWhereInput
    /**
     * Limit how many Subtitles to delete.
     */
    limit?: number
  }

  /**
   * Subtitle without action
   */
  export type SubtitleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtitle
     */
    select?: SubtitleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtitle
     */
    omit?: SubtitleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtitleInclude<ExtArgs> | null
  }


  /**
   * Model WatchHistory
   */

  export type AggregateWatchHistory = {
    _count: WatchHistoryCountAggregateOutputType | null
    _avg: WatchHistoryAvgAggregateOutputType | null
    _sum: WatchHistorySumAggregateOutputType | null
    _min: WatchHistoryMinAggregateOutputType | null
    _max: WatchHistoryMaxAggregateOutputType | null
  }

  export type WatchHistoryAvgAggregateOutputType = {
    progress: number | null
  }

  export type WatchHistorySumAggregateOutputType = {
    progress: number | null
  }

  export type WatchHistoryMinAggregateOutputType = {
    userId: string | null
    episodeId: string | null
    progress: number | null
    completed: boolean | null
    updatedAt: Date | null
  }

  export type WatchHistoryMaxAggregateOutputType = {
    userId: string | null
    episodeId: string | null
    progress: number | null
    completed: boolean | null
    updatedAt: Date | null
  }

  export type WatchHistoryCountAggregateOutputType = {
    userId: number
    episodeId: number
    progress: number
    completed: number
    updatedAt: number
    _all: number
  }


  export type WatchHistoryAvgAggregateInputType = {
    progress?: true
  }

  export type WatchHistorySumAggregateInputType = {
    progress?: true
  }

  export type WatchHistoryMinAggregateInputType = {
    userId?: true
    episodeId?: true
    progress?: true
    completed?: true
    updatedAt?: true
  }

  export type WatchHistoryMaxAggregateInputType = {
    userId?: true
    episodeId?: true
    progress?: true
    completed?: true
    updatedAt?: true
  }

  export type WatchHistoryCountAggregateInputType = {
    userId?: true
    episodeId?: true
    progress?: true
    completed?: true
    updatedAt?: true
    _all?: true
  }

  export type WatchHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WatchHistory to aggregate.
     */
    where?: WatchHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WatchHistories to fetch.
     */
    orderBy?: WatchHistoryOrderByWithRelationInput | WatchHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WatchHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WatchHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WatchHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WatchHistories
    **/
    _count?: true | WatchHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WatchHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WatchHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WatchHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WatchHistoryMaxAggregateInputType
  }

  export type GetWatchHistoryAggregateType<T extends WatchHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateWatchHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWatchHistory[P]>
      : GetScalarType<T[P], AggregateWatchHistory[P]>
  }




  export type WatchHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchHistoryWhereInput
    orderBy?: WatchHistoryOrderByWithAggregationInput | WatchHistoryOrderByWithAggregationInput[]
    by: WatchHistoryScalarFieldEnum[] | WatchHistoryScalarFieldEnum
    having?: WatchHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WatchHistoryCountAggregateInputType | true
    _avg?: WatchHistoryAvgAggregateInputType
    _sum?: WatchHistorySumAggregateInputType
    _min?: WatchHistoryMinAggregateInputType
    _max?: WatchHistoryMaxAggregateInputType
  }

  export type WatchHistoryGroupByOutputType = {
    userId: string
    episodeId: string
    progress: number
    completed: boolean
    updatedAt: Date
    _count: WatchHistoryCountAggregateOutputType | null
    _avg: WatchHistoryAvgAggregateOutputType | null
    _sum: WatchHistorySumAggregateOutputType | null
    _min: WatchHistoryMinAggregateOutputType | null
    _max: WatchHistoryMaxAggregateOutputType | null
  }

  type GetWatchHistoryGroupByPayload<T extends WatchHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WatchHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WatchHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WatchHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], WatchHistoryGroupByOutputType[P]>
        }
      >
    >


  export type WatchHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    episodeId?: boolean
    progress?: boolean
    completed?: boolean
    updatedAt?: boolean
    user?: boolean | ProfileDefaultArgs<ExtArgs>
    episode?: boolean | EpisodeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["watchHistory"]>

  export type WatchHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    episodeId?: boolean
    progress?: boolean
    completed?: boolean
    updatedAt?: boolean
    user?: boolean | ProfileDefaultArgs<ExtArgs>
    episode?: boolean | EpisodeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["watchHistory"]>

  export type WatchHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    episodeId?: boolean
    progress?: boolean
    completed?: boolean
    updatedAt?: boolean
    user?: boolean | ProfileDefaultArgs<ExtArgs>
    episode?: boolean | EpisodeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["watchHistory"]>

  export type WatchHistorySelectScalar = {
    userId?: boolean
    episodeId?: boolean
    progress?: boolean
    completed?: boolean
    updatedAt?: boolean
  }

  export type WatchHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "episodeId" | "progress" | "completed" | "updatedAt", ExtArgs["result"]["watchHistory"]>
  export type WatchHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | ProfileDefaultArgs<ExtArgs>
    episode?: boolean | EpisodeDefaultArgs<ExtArgs>
  }
  export type WatchHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | ProfileDefaultArgs<ExtArgs>
    episode?: boolean | EpisodeDefaultArgs<ExtArgs>
  }
  export type WatchHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | ProfileDefaultArgs<ExtArgs>
    episode?: boolean | EpisodeDefaultArgs<ExtArgs>
  }

  export type $WatchHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WatchHistory"
    objects: {
      user: Prisma.$ProfilePayload<ExtArgs>
      episode: Prisma.$EpisodePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      episodeId: string
      progress: number
      completed: boolean
      updatedAt: Date
    }, ExtArgs["result"]["watchHistory"]>
    composites: {}
  }

  type WatchHistoryGetPayload<S extends boolean | null | undefined | WatchHistoryDefaultArgs> = $Result.GetResult<Prisma.$WatchHistoryPayload, S>

  type WatchHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WatchHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WatchHistoryCountAggregateInputType | true
    }

  export interface WatchHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WatchHistory'], meta: { name: 'WatchHistory' } }
    /**
     * Find zero or one WatchHistory that matches the filter.
     * @param {WatchHistoryFindUniqueArgs} args - Arguments to find a WatchHistory
     * @example
     * // Get one WatchHistory
     * const watchHistory = await prisma.watchHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WatchHistoryFindUniqueArgs>(args: SelectSubset<T, WatchHistoryFindUniqueArgs<ExtArgs>>): Prisma__WatchHistoryClient<$Result.GetResult<Prisma.$WatchHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WatchHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WatchHistoryFindUniqueOrThrowArgs} args - Arguments to find a WatchHistory
     * @example
     * // Get one WatchHistory
     * const watchHistory = await prisma.watchHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WatchHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, WatchHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WatchHistoryClient<$Result.GetResult<Prisma.$WatchHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WatchHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchHistoryFindFirstArgs} args - Arguments to find a WatchHistory
     * @example
     * // Get one WatchHistory
     * const watchHistory = await prisma.watchHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WatchHistoryFindFirstArgs>(args?: SelectSubset<T, WatchHistoryFindFirstArgs<ExtArgs>>): Prisma__WatchHistoryClient<$Result.GetResult<Prisma.$WatchHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WatchHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchHistoryFindFirstOrThrowArgs} args - Arguments to find a WatchHistory
     * @example
     * // Get one WatchHistory
     * const watchHistory = await prisma.watchHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WatchHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, WatchHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__WatchHistoryClient<$Result.GetResult<Prisma.$WatchHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WatchHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WatchHistories
     * const watchHistories = await prisma.watchHistory.findMany()
     * 
     * // Get first 10 WatchHistories
     * const watchHistories = await prisma.watchHistory.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const watchHistoryWithUserIdOnly = await prisma.watchHistory.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends WatchHistoryFindManyArgs>(args?: SelectSubset<T, WatchHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WatchHistory.
     * @param {WatchHistoryCreateArgs} args - Arguments to create a WatchHistory.
     * @example
     * // Create one WatchHistory
     * const WatchHistory = await prisma.watchHistory.create({
     *   data: {
     *     // ... data to create a WatchHistory
     *   }
     * })
     * 
     */
    create<T extends WatchHistoryCreateArgs>(args: SelectSubset<T, WatchHistoryCreateArgs<ExtArgs>>): Prisma__WatchHistoryClient<$Result.GetResult<Prisma.$WatchHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WatchHistories.
     * @param {WatchHistoryCreateManyArgs} args - Arguments to create many WatchHistories.
     * @example
     * // Create many WatchHistories
     * const watchHistory = await prisma.watchHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WatchHistoryCreateManyArgs>(args?: SelectSubset<T, WatchHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WatchHistories and returns the data saved in the database.
     * @param {WatchHistoryCreateManyAndReturnArgs} args - Arguments to create many WatchHistories.
     * @example
     * // Create many WatchHistories
     * const watchHistory = await prisma.watchHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WatchHistories and only return the `userId`
     * const watchHistoryWithUserIdOnly = await prisma.watchHistory.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WatchHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, WatchHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WatchHistory.
     * @param {WatchHistoryDeleteArgs} args - Arguments to delete one WatchHistory.
     * @example
     * // Delete one WatchHistory
     * const WatchHistory = await prisma.watchHistory.delete({
     *   where: {
     *     // ... filter to delete one WatchHistory
     *   }
     * })
     * 
     */
    delete<T extends WatchHistoryDeleteArgs>(args: SelectSubset<T, WatchHistoryDeleteArgs<ExtArgs>>): Prisma__WatchHistoryClient<$Result.GetResult<Prisma.$WatchHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WatchHistory.
     * @param {WatchHistoryUpdateArgs} args - Arguments to update one WatchHistory.
     * @example
     * // Update one WatchHistory
     * const watchHistory = await prisma.watchHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WatchHistoryUpdateArgs>(args: SelectSubset<T, WatchHistoryUpdateArgs<ExtArgs>>): Prisma__WatchHistoryClient<$Result.GetResult<Prisma.$WatchHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WatchHistories.
     * @param {WatchHistoryDeleteManyArgs} args - Arguments to filter WatchHistories to delete.
     * @example
     * // Delete a few WatchHistories
     * const { count } = await prisma.watchHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WatchHistoryDeleteManyArgs>(args?: SelectSubset<T, WatchHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WatchHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WatchHistories
     * const watchHistory = await prisma.watchHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WatchHistoryUpdateManyArgs>(args: SelectSubset<T, WatchHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WatchHistories and returns the data updated in the database.
     * @param {WatchHistoryUpdateManyAndReturnArgs} args - Arguments to update many WatchHistories.
     * @example
     * // Update many WatchHistories
     * const watchHistory = await prisma.watchHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WatchHistories and only return the `userId`
     * const watchHistoryWithUserIdOnly = await prisma.watchHistory.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WatchHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, WatchHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WatchHistory.
     * @param {WatchHistoryUpsertArgs} args - Arguments to update or create a WatchHistory.
     * @example
     * // Update or create a WatchHistory
     * const watchHistory = await prisma.watchHistory.upsert({
     *   create: {
     *     // ... data to create a WatchHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WatchHistory we want to update
     *   }
     * })
     */
    upsert<T extends WatchHistoryUpsertArgs>(args: SelectSubset<T, WatchHistoryUpsertArgs<ExtArgs>>): Prisma__WatchHistoryClient<$Result.GetResult<Prisma.$WatchHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WatchHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchHistoryCountArgs} args - Arguments to filter WatchHistories to count.
     * @example
     * // Count the number of WatchHistories
     * const count = await prisma.watchHistory.count({
     *   where: {
     *     // ... the filter for the WatchHistories we want to count
     *   }
     * })
    **/
    count<T extends WatchHistoryCountArgs>(
      args?: Subset<T, WatchHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WatchHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WatchHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WatchHistoryAggregateArgs>(args: Subset<T, WatchHistoryAggregateArgs>): Prisma.PrismaPromise<GetWatchHistoryAggregateType<T>>

    /**
     * Group by WatchHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WatchHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WatchHistoryGroupByArgs['orderBy'] }
        : { orderBy?: WatchHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WatchHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWatchHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WatchHistory model
   */
  readonly fields: WatchHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WatchHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WatchHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    episode<T extends EpisodeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EpisodeDefaultArgs<ExtArgs>>): Prisma__EpisodeClient<$Result.GetResult<Prisma.$EpisodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WatchHistory model
   */
  interface WatchHistoryFieldRefs {
    readonly userId: FieldRef<"WatchHistory", 'String'>
    readonly episodeId: FieldRef<"WatchHistory", 'String'>
    readonly progress: FieldRef<"WatchHistory", 'Int'>
    readonly completed: FieldRef<"WatchHistory", 'Boolean'>
    readonly updatedAt: FieldRef<"WatchHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WatchHistory findUnique
   */
  export type WatchHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchHistory
     */
    select?: WatchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchHistory
     */
    omit?: WatchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchHistoryInclude<ExtArgs> | null
    /**
     * Filter, which WatchHistory to fetch.
     */
    where: WatchHistoryWhereUniqueInput
  }

  /**
   * WatchHistory findUniqueOrThrow
   */
  export type WatchHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchHistory
     */
    select?: WatchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchHistory
     */
    omit?: WatchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchHistoryInclude<ExtArgs> | null
    /**
     * Filter, which WatchHistory to fetch.
     */
    where: WatchHistoryWhereUniqueInput
  }

  /**
   * WatchHistory findFirst
   */
  export type WatchHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchHistory
     */
    select?: WatchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchHistory
     */
    omit?: WatchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchHistoryInclude<ExtArgs> | null
    /**
     * Filter, which WatchHistory to fetch.
     */
    where?: WatchHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WatchHistories to fetch.
     */
    orderBy?: WatchHistoryOrderByWithRelationInput | WatchHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WatchHistories.
     */
    cursor?: WatchHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WatchHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WatchHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WatchHistories.
     */
    distinct?: WatchHistoryScalarFieldEnum | WatchHistoryScalarFieldEnum[]
  }

  /**
   * WatchHistory findFirstOrThrow
   */
  export type WatchHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchHistory
     */
    select?: WatchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchHistory
     */
    omit?: WatchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchHistoryInclude<ExtArgs> | null
    /**
     * Filter, which WatchHistory to fetch.
     */
    where?: WatchHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WatchHistories to fetch.
     */
    orderBy?: WatchHistoryOrderByWithRelationInput | WatchHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WatchHistories.
     */
    cursor?: WatchHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WatchHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WatchHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WatchHistories.
     */
    distinct?: WatchHistoryScalarFieldEnum | WatchHistoryScalarFieldEnum[]
  }

  /**
   * WatchHistory findMany
   */
  export type WatchHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchHistory
     */
    select?: WatchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchHistory
     */
    omit?: WatchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchHistoryInclude<ExtArgs> | null
    /**
     * Filter, which WatchHistories to fetch.
     */
    where?: WatchHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WatchHistories to fetch.
     */
    orderBy?: WatchHistoryOrderByWithRelationInput | WatchHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WatchHistories.
     */
    cursor?: WatchHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WatchHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WatchHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WatchHistories.
     */
    distinct?: WatchHistoryScalarFieldEnum | WatchHistoryScalarFieldEnum[]
  }

  /**
   * WatchHistory create
   */
  export type WatchHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchHistory
     */
    select?: WatchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchHistory
     */
    omit?: WatchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a WatchHistory.
     */
    data: XOR<WatchHistoryCreateInput, WatchHistoryUncheckedCreateInput>
  }

  /**
   * WatchHistory createMany
   */
  export type WatchHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WatchHistories.
     */
    data: WatchHistoryCreateManyInput | WatchHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WatchHistory createManyAndReturn
   */
  export type WatchHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchHistory
     */
    select?: WatchHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WatchHistory
     */
    omit?: WatchHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many WatchHistories.
     */
    data: WatchHistoryCreateManyInput | WatchHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WatchHistory update
   */
  export type WatchHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchHistory
     */
    select?: WatchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchHistory
     */
    omit?: WatchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a WatchHistory.
     */
    data: XOR<WatchHistoryUpdateInput, WatchHistoryUncheckedUpdateInput>
    /**
     * Choose, which WatchHistory to update.
     */
    where: WatchHistoryWhereUniqueInput
  }

  /**
   * WatchHistory updateMany
   */
  export type WatchHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WatchHistories.
     */
    data: XOR<WatchHistoryUpdateManyMutationInput, WatchHistoryUncheckedUpdateManyInput>
    /**
     * Filter which WatchHistories to update
     */
    where?: WatchHistoryWhereInput
    /**
     * Limit how many WatchHistories to update.
     */
    limit?: number
  }

  /**
   * WatchHistory updateManyAndReturn
   */
  export type WatchHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchHistory
     */
    select?: WatchHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WatchHistory
     */
    omit?: WatchHistoryOmit<ExtArgs> | null
    /**
     * The data used to update WatchHistories.
     */
    data: XOR<WatchHistoryUpdateManyMutationInput, WatchHistoryUncheckedUpdateManyInput>
    /**
     * Filter which WatchHistories to update
     */
    where?: WatchHistoryWhereInput
    /**
     * Limit how many WatchHistories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchHistoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WatchHistory upsert
   */
  export type WatchHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchHistory
     */
    select?: WatchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchHistory
     */
    omit?: WatchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the WatchHistory to update in case it exists.
     */
    where: WatchHistoryWhereUniqueInput
    /**
     * In case the WatchHistory found by the `where` argument doesn't exist, create a new WatchHistory with this data.
     */
    create: XOR<WatchHistoryCreateInput, WatchHistoryUncheckedCreateInput>
    /**
     * In case the WatchHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WatchHistoryUpdateInput, WatchHistoryUncheckedUpdateInput>
  }

  /**
   * WatchHistory delete
   */
  export type WatchHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchHistory
     */
    select?: WatchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchHistory
     */
    omit?: WatchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchHistoryInclude<ExtArgs> | null
    /**
     * Filter which WatchHistory to delete.
     */
    where: WatchHistoryWhereUniqueInput
  }

  /**
   * WatchHistory deleteMany
   */
  export type WatchHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WatchHistories to delete
     */
    where?: WatchHistoryWhereInput
    /**
     * Limit how many WatchHistories to delete.
     */
    limit?: number
  }

  /**
   * WatchHistory without action
   */
  export type WatchHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WatchHistory
     */
    select?: WatchHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the WatchHistory
     */
    omit?: WatchHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchHistoryInclude<ExtArgs> | null
  }


  /**
   * Model Bookmark
   */

  export type AggregateBookmark = {
    _count: BookmarkCountAggregateOutputType | null
    _min: BookmarkMinAggregateOutputType | null
    _max: BookmarkMaxAggregateOutputType | null
  }

  export type BookmarkMinAggregateOutputType = {
    userId: string | null
    animeId: string | null
    status: $Enums.BookmarkStatus | null
    addedAt: Date | null
  }

  export type BookmarkMaxAggregateOutputType = {
    userId: string | null
    animeId: string | null
    status: $Enums.BookmarkStatus | null
    addedAt: Date | null
  }

  export type BookmarkCountAggregateOutputType = {
    userId: number
    animeId: number
    status: number
    addedAt: number
    _all: number
  }


  export type BookmarkMinAggregateInputType = {
    userId?: true
    animeId?: true
    status?: true
    addedAt?: true
  }

  export type BookmarkMaxAggregateInputType = {
    userId?: true
    animeId?: true
    status?: true
    addedAt?: true
  }

  export type BookmarkCountAggregateInputType = {
    userId?: true
    animeId?: true
    status?: true
    addedAt?: true
    _all?: true
  }

  export type BookmarkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookmark to aggregate.
     */
    where?: BookmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookmarks to fetch.
     */
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bookmarks
    **/
    _count?: true | BookmarkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookmarkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookmarkMaxAggregateInputType
  }

  export type GetBookmarkAggregateType<T extends BookmarkAggregateArgs> = {
        [P in keyof T & keyof AggregateBookmark]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBookmark[P]>
      : GetScalarType<T[P], AggregateBookmark[P]>
  }




  export type BookmarkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookmarkWhereInput
    orderBy?: BookmarkOrderByWithAggregationInput | BookmarkOrderByWithAggregationInput[]
    by: BookmarkScalarFieldEnum[] | BookmarkScalarFieldEnum
    having?: BookmarkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookmarkCountAggregateInputType | true
    _min?: BookmarkMinAggregateInputType
    _max?: BookmarkMaxAggregateInputType
  }

  export type BookmarkGroupByOutputType = {
    userId: string
    animeId: string
    status: $Enums.BookmarkStatus
    addedAt: Date
    _count: BookmarkCountAggregateOutputType | null
    _min: BookmarkMinAggregateOutputType | null
    _max: BookmarkMaxAggregateOutputType | null
  }

  type GetBookmarkGroupByPayload<T extends BookmarkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookmarkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookmarkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookmarkGroupByOutputType[P]>
            : GetScalarType<T[P], BookmarkGroupByOutputType[P]>
        }
      >
    >


  export type BookmarkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    animeId?: boolean
    status?: boolean
    addedAt?: boolean
    user?: boolean | ProfileDefaultArgs<ExtArgs>
    anime?: boolean | AnimeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookmark"]>

  export type BookmarkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    animeId?: boolean
    status?: boolean
    addedAt?: boolean
    user?: boolean | ProfileDefaultArgs<ExtArgs>
    anime?: boolean | AnimeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookmark"]>

  export type BookmarkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    animeId?: boolean
    status?: boolean
    addedAt?: boolean
    user?: boolean | ProfileDefaultArgs<ExtArgs>
    anime?: boolean | AnimeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookmark"]>

  export type BookmarkSelectScalar = {
    userId?: boolean
    animeId?: boolean
    status?: boolean
    addedAt?: boolean
  }

  export type BookmarkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "animeId" | "status" | "addedAt", ExtArgs["result"]["bookmark"]>
  export type BookmarkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | ProfileDefaultArgs<ExtArgs>
    anime?: boolean | AnimeDefaultArgs<ExtArgs>
  }
  export type BookmarkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | ProfileDefaultArgs<ExtArgs>
    anime?: boolean | AnimeDefaultArgs<ExtArgs>
  }
  export type BookmarkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | ProfileDefaultArgs<ExtArgs>
    anime?: boolean | AnimeDefaultArgs<ExtArgs>
  }

  export type $BookmarkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Bookmark"
    objects: {
      user: Prisma.$ProfilePayload<ExtArgs>
      anime: Prisma.$AnimePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      animeId: string
      status: $Enums.BookmarkStatus
      addedAt: Date
    }, ExtArgs["result"]["bookmark"]>
    composites: {}
  }

  type BookmarkGetPayload<S extends boolean | null | undefined | BookmarkDefaultArgs> = $Result.GetResult<Prisma.$BookmarkPayload, S>

  type BookmarkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BookmarkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookmarkCountAggregateInputType | true
    }

  export interface BookmarkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Bookmark'], meta: { name: 'Bookmark' } }
    /**
     * Find zero or one Bookmark that matches the filter.
     * @param {BookmarkFindUniqueArgs} args - Arguments to find a Bookmark
     * @example
     * // Get one Bookmark
     * const bookmark = await prisma.bookmark.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookmarkFindUniqueArgs>(args: SelectSubset<T, BookmarkFindUniqueArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bookmark that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookmarkFindUniqueOrThrowArgs} args - Arguments to find a Bookmark
     * @example
     * // Get one Bookmark
     * const bookmark = await prisma.bookmark.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookmarkFindUniqueOrThrowArgs>(args: SelectSubset<T, BookmarkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bookmark that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkFindFirstArgs} args - Arguments to find a Bookmark
     * @example
     * // Get one Bookmark
     * const bookmark = await prisma.bookmark.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookmarkFindFirstArgs>(args?: SelectSubset<T, BookmarkFindFirstArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bookmark that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkFindFirstOrThrowArgs} args - Arguments to find a Bookmark
     * @example
     * // Get one Bookmark
     * const bookmark = await prisma.bookmark.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookmarkFindFirstOrThrowArgs>(args?: SelectSubset<T, BookmarkFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bookmarks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookmarks
     * const bookmarks = await prisma.bookmark.findMany()
     * 
     * // Get first 10 Bookmarks
     * const bookmarks = await prisma.bookmark.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const bookmarkWithUserIdOnly = await prisma.bookmark.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends BookmarkFindManyArgs>(args?: SelectSubset<T, BookmarkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bookmark.
     * @param {BookmarkCreateArgs} args - Arguments to create a Bookmark.
     * @example
     * // Create one Bookmark
     * const Bookmark = await prisma.bookmark.create({
     *   data: {
     *     // ... data to create a Bookmark
     *   }
     * })
     * 
     */
    create<T extends BookmarkCreateArgs>(args: SelectSubset<T, BookmarkCreateArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bookmarks.
     * @param {BookmarkCreateManyArgs} args - Arguments to create many Bookmarks.
     * @example
     * // Create many Bookmarks
     * const bookmark = await prisma.bookmark.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookmarkCreateManyArgs>(args?: SelectSubset<T, BookmarkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bookmarks and returns the data saved in the database.
     * @param {BookmarkCreateManyAndReturnArgs} args - Arguments to create many Bookmarks.
     * @example
     * // Create many Bookmarks
     * const bookmark = await prisma.bookmark.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bookmarks and only return the `userId`
     * const bookmarkWithUserIdOnly = await prisma.bookmark.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookmarkCreateManyAndReturnArgs>(args?: SelectSubset<T, BookmarkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Bookmark.
     * @param {BookmarkDeleteArgs} args - Arguments to delete one Bookmark.
     * @example
     * // Delete one Bookmark
     * const Bookmark = await prisma.bookmark.delete({
     *   where: {
     *     // ... filter to delete one Bookmark
     *   }
     * })
     * 
     */
    delete<T extends BookmarkDeleteArgs>(args: SelectSubset<T, BookmarkDeleteArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bookmark.
     * @param {BookmarkUpdateArgs} args - Arguments to update one Bookmark.
     * @example
     * // Update one Bookmark
     * const bookmark = await prisma.bookmark.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookmarkUpdateArgs>(args: SelectSubset<T, BookmarkUpdateArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bookmarks.
     * @param {BookmarkDeleteManyArgs} args - Arguments to filter Bookmarks to delete.
     * @example
     * // Delete a few Bookmarks
     * const { count } = await prisma.bookmark.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookmarkDeleteManyArgs>(args?: SelectSubset<T, BookmarkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookmarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookmarks
     * const bookmark = await prisma.bookmark.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookmarkUpdateManyArgs>(args: SelectSubset<T, BookmarkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookmarks and returns the data updated in the database.
     * @param {BookmarkUpdateManyAndReturnArgs} args - Arguments to update many Bookmarks.
     * @example
     * // Update many Bookmarks
     * const bookmark = await prisma.bookmark.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bookmarks and only return the `userId`
     * const bookmarkWithUserIdOnly = await prisma.bookmark.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BookmarkUpdateManyAndReturnArgs>(args: SelectSubset<T, BookmarkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Bookmark.
     * @param {BookmarkUpsertArgs} args - Arguments to update or create a Bookmark.
     * @example
     * // Update or create a Bookmark
     * const bookmark = await prisma.bookmark.upsert({
     *   create: {
     *     // ... data to create a Bookmark
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bookmark we want to update
     *   }
     * })
     */
    upsert<T extends BookmarkUpsertArgs>(args: SelectSubset<T, BookmarkUpsertArgs<ExtArgs>>): Prisma__BookmarkClient<$Result.GetResult<Prisma.$BookmarkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bookmarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkCountArgs} args - Arguments to filter Bookmarks to count.
     * @example
     * // Count the number of Bookmarks
     * const count = await prisma.bookmark.count({
     *   where: {
     *     // ... the filter for the Bookmarks we want to count
     *   }
     * })
    **/
    count<T extends BookmarkCountArgs>(
      args?: Subset<T, BookmarkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookmarkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bookmark.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookmarkAggregateArgs>(args: Subset<T, BookmarkAggregateArgs>): Prisma.PrismaPromise<GetBookmarkAggregateType<T>>

    /**
     * Group by Bookmark.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookmarkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookmarkGroupByArgs['orderBy'] }
        : { orderBy?: BookmarkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookmarkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookmarkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Bookmark model
   */
  readonly fields: BookmarkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Bookmark.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookmarkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    anime<T extends AnimeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AnimeDefaultArgs<ExtArgs>>): Prisma__AnimeClient<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Bookmark model
   */
  interface BookmarkFieldRefs {
    readonly userId: FieldRef<"Bookmark", 'String'>
    readonly animeId: FieldRef<"Bookmark", 'String'>
    readonly status: FieldRef<"Bookmark", 'BookmarkStatus'>
    readonly addedAt: FieldRef<"Bookmark", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Bookmark findUnique
   */
  export type BookmarkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter, which Bookmark to fetch.
     */
    where: BookmarkWhereUniqueInput
  }

  /**
   * Bookmark findUniqueOrThrow
   */
  export type BookmarkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter, which Bookmark to fetch.
     */
    where: BookmarkWhereUniqueInput
  }

  /**
   * Bookmark findFirst
   */
  export type BookmarkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter, which Bookmark to fetch.
     */
    where?: BookmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookmarks to fetch.
     */
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookmarks.
     */
    cursor?: BookmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookmarks.
     */
    distinct?: BookmarkScalarFieldEnum | BookmarkScalarFieldEnum[]
  }

  /**
   * Bookmark findFirstOrThrow
   */
  export type BookmarkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter, which Bookmark to fetch.
     */
    where?: BookmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookmarks to fetch.
     */
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bookmarks.
     */
    cursor?: BookmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookmarks.
     */
    distinct?: BookmarkScalarFieldEnum | BookmarkScalarFieldEnum[]
  }

  /**
   * Bookmark findMany
   */
  export type BookmarkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter, which Bookmarks to fetch.
     */
    where?: BookmarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bookmarks to fetch.
     */
    orderBy?: BookmarkOrderByWithRelationInput | BookmarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bookmarks.
     */
    cursor?: BookmarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bookmarks.
     */
    distinct?: BookmarkScalarFieldEnum | BookmarkScalarFieldEnum[]
  }

  /**
   * Bookmark create
   */
  export type BookmarkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * The data needed to create a Bookmark.
     */
    data: XOR<BookmarkCreateInput, BookmarkUncheckedCreateInput>
  }

  /**
   * Bookmark createMany
   */
  export type BookmarkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bookmarks.
     */
    data: BookmarkCreateManyInput | BookmarkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Bookmark createManyAndReturn
   */
  export type BookmarkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * The data used to create many Bookmarks.
     */
    data: BookmarkCreateManyInput | BookmarkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Bookmark update
   */
  export type BookmarkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * The data needed to update a Bookmark.
     */
    data: XOR<BookmarkUpdateInput, BookmarkUncheckedUpdateInput>
    /**
     * Choose, which Bookmark to update.
     */
    where: BookmarkWhereUniqueInput
  }

  /**
   * Bookmark updateMany
   */
  export type BookmarkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bookmarks.
     */
    data: XOR<BookmarkUpdateManyMutationInput, BookmarkUncheckedUpdateManyInput>
    /**
     * Filter which Bookmarks to update
     */
    where?: BookmarkWhereInput
    /**
     * Limit how many Bookmarks to update.
     */
    limit?: number
  }

  /**
   * Bookmark updateManyAndReturn
   */
  export type BookmarkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * The data used to update Bookmarks.
     */
    data: XOR<BookmarkUpdateManyMutationInput, BookmarkUncheckedUpdateManyInput>
    /**
     * Filter which Bookmarks to update
     */
    where?: BookmarkWhereInput
    /**
     * Limit how many Bookmarks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Bookmark upsert
   */
  export type BookmarkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * The filter to search for the Bookmark to update in case it exists.
     */
    where: BookmarkWhereUniqueInput
    /**
     * In case the Bookmark found by the `where` argument doesn't exist, create a new Bookmark with this data.
     */
    create: XOR<BookmarkCreateInput, BookmarkUncheckedCreateInput>
    /**
     * In case the Bookmark was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookmarkUpdateInput, BookmarkUncheckedUpdateInput>
  }

  /**
   * Bookmark delete
   */
  export type BookmarkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
    /**
     * Filter which Bookmark to delete.
     */
    where: BookmarkWhereUniqueInput
  }

  /**
   * Bookmark deleteMany
   */
  export type BookmarkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bookmarks to delete
     */
    where?: BookmarkWhereInput
    /**
     * Limit how many Bookmarks to delete.
     */
    limit?: number
  }

  /**
   * Bookmark without action
   */
  export type BookmarkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bookmark
     */
    select?: BookmarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bookmark
     */
    omit?: BookmarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookmarkInclude<ExtArgs> | null
  }


  /**
   * Model Comment
   */

  export type AggregateComment = {
    _count: CommentCountAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  export type CommentMinAggregateOutputType = {
    id: string | null
    episodeId: string | null
    userId: string | null
    parentId: string | null
    body: string | null
    isSpoiler: boolean | null
    isDeleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CommentMaxAggregateOutputType = {
    id: string | null
    episodeId: string | null
    userId: string | null
    parentId: string | null
    body: string | null
    isSpoiler: boolean | null
    isDeleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CommentCountAggregateOutputType = {
    id: number
    episodeId: number
    userId: number
    parentId: number
    body: number
    isSpoiler: number
    isDeleted: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CommentMinAggregateInputType = {
    id?: true
    episodeId?: true
    userId?: true
    parentId?: true
    body?: true
    isSpoiler?: true
    isDeleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CommentMaxAggregateInputType = {
    id?: true
    episodeId?: true
    userId?: true
    parentId?: true
    body?: true
    isSpoiler?: true
    isDeleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CommentCountAggregateInputType = {
    id?: true
    episodeId?: true
    userId?: true
    parentId?: true
    body?: true
    isSpoiler?: true
    isDeleted?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comment to aggregate.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comments
    **/
    _count?: true | CommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentMaxAggregateInputType
  }

  export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
        [P in keyof T & keyof AggregateComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComment[P]>
      : GetScalarType<T[P], AggregateComment[P]>
  }




  export type CommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithAggregationInput | CommentOrderByWithAggregationInput[]
    by: CommentScalarFieldEnum[] | CommentScalarFieldEnum
    having?: CommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentCountAggregateInputType | true
    _min?: CommentMinAggregateInputType
    _max?: CommentMaxAggregateInputType
  }

  export type CommentGroupByOutputType = {
    id: string
    episodeId: string
    userId: string
    parentId: string | null
    body: string
    isSpoiler: boolean
    isDeleted: boolean
    createdAt: Date
    updatedAt: Date
    _count: CommentCountAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  type GetCommentGroupByPayload<T extends CommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentGroupByOutputType[P]>
            : GetScalarType<T[P], CommentGroupByOutputType[P]>
        }
      >
    >


  export type CommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    episodeId?: boolean
    userId?: boolean
    parentId?: boolean
    body?: boolean
    isSpoiler?: boolean
    isDeleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    episode?: boolean | EpisodeDefaultArgs<ExtArgs>
    user?: boolean | ProfileDefaultArgs<ExtArgs>
    parent?: boolean | Comment$parentArgs<ExtArgs>
    replies?: boolean | Comment$repliesArgs<ExtArgs>
    _count?: boolean | CommentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    episodeId?: boolean
    userId?: boolean
    parentId?: boolean
    body?: boolean
    isSpoiler?: boolean
    isDeleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    episode?: boolean | EpisodeDefaultArgs<ExtArgs>
    user?: boolean | ProfileDefaultArgs<ExtArgs>
    parent?: boolean | Comment$parentArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    episodeId?: boolean
    userId?: boolean
    parentId?: boolean
    body?: boolean
    isSpoiler?: boolean
    isDeleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    episode?: boolean | EpisodeDefaultArgs<ExtArgs>
    user?: boolean | ProfileDefaultArgs<ExtArgs>
    parent?: boolean | Comment$parentArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectScalar = {
    id?: boolean
    episodeId?: boolean
    userId?: boolean
    parentId?: boolean
    body?: boolean
    isSpoiler?: boolean
    isDeleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "episodeId" | "userId" | "parentId" | "body" | "isSpoiler" | "isDeleted" | "createdAt" | "updatedAt", ExtArgs["result"]["comment"]>
  export type CommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    episode?: boolean | EpisodeDefaultArgs<ExtArgs>
    user?: boolean | ProfileDefaultArgs<ExtArgs>
    parent?: boolean | Comment$parentArgs<ExtArgs>
    replies?: boolean | Comment$repliesArgs<ExtArgs>
    _count?: boolean | CommentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CommentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    episode?: boolean | EpisodeDefaultArgs<ExtArgs>
    user?: boolean | ProfileDefaultArgs<ExtArgs>
    parent?: boolean | Comment$parentArgs<ExtArgs>
  }
  export type CommentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    episode?: boolean | EpisodeDefaultArgs<ExtArgs>
    user?: boolean | ProfileDefaultArgs<ExtArgs>
    parent?: boolean | Comment$parentArgs<ExtArgs>
  }

  export type $CommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Comment"
    objects: {
      episode: Prisma.$EpisodePayload<ExtArgs>
      user: Prisma.$ProfilePayload<ExtArgs>
      parent: Prisma.$CommentPayload<ExtArgs> | null
      replies: Prisma.$CommentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      episodeId: string
      userId: string
      parentId: string | null
      body: string
      isSpoiler: boolean
      isDeleted: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["comment"]>
    composites: {}
  }

  type CommentGetPayload<S extends boolean | null | undefined | CommentDefaultArgs> = $Result.GetResult<Prisma.$CommentPayload, S>

  type CommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommentCountAggregateInputType | true
    }

  export interface CommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Comment'], meta: { name: 'Comment' } }
    /**
     * Find zero or one Comment that matches the filter.
     * @param {CommentFindUniqueArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommentFindUniqueArgs>(args: SelectSubset<T, CommentFindUniqueArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Comment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommentFindUniqueOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommentFindUniqueOrThrowArgs>(args: SelectSubset<T, CommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommentFindFirstArgs>(args?: SelectSubset<T, CommentFindFirstArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommentFindFirstOrThrowArgs>(args?: SelectSubset<T, CommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comment.findMany()
     * 
     * // Get first 10 Comments
     * const comments = await prisma.comment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentWithIdOnly = await prisma.comment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommentFindManyArgs>(args?: SelectSubset<T, CommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Comment.
     * @param {CommentCreateArgs} args - Arguments to create a Comment.
     * @example
     * // Create one Comment
     * const Comment = await prisma.comment.create({
     *   data: {
     *     // ... data to create a Comment
     *   }
     * })
     * 
     */
    create<T extends CommentCreateArgs>(args: SelectSubset<T, CommentCreateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Comments.
     * @param {CommentCreateManyArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommentCreateManyArgs>(args?: SelectSubset<T, CommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Comments and returns the data saved in the database.
     * @param {CommentCreateManyAndReturnArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommentCreateManyAndReturnArgs>(args?: SelectSubset<T, CommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Comment.
     * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
     * @example
     * // Delete one Comment
     * const Comment = await prisma.comment.delete({
     *   where: {
     *     // ... filter to delete one Comment
     *   }
     * })
     * 
     */
    delete<T extends CommentDeleteArgs>(args: SelectSubset<T, CommentDeleteArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Comment.
     * @param {CommentUpdateArgs} args - Arguments to update one Comment.
     * @example
     * // Update one Comment
     * const comment = await prisma.comment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommentUpdateArgs>(args: SelectSubset<T, CommentUpdateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Comments.
     * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommentDeleteManyArgs>(args?: SelectSubset<T, CommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommentUpdateManyArgs>(args: SelectSubset<T, CommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments and returns the data updated in the database.
     * @param {CommentUpdateManyAndReturnArgs} args - Arguments to update many Comments.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CommentUpdateManyAndReturnArgs>(args: SelectSubset<T, CommentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Comment.
     * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
     * @example
     * // Update or create a Comment
     * const comment = await prisma.comment.upsert({
     *   create: {
     *     // ... data to create a Comment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comment we want to update
     *   }
     * })
     */
    upsert<T extends CommentUpsertArgs>(args: SelectSubset<T, CommentUpsertArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comment.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
    **/
    count<T extends CommentCountArgs>(
      args?: Subset<T, CommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommentAggregateArgs>(args: Subset<T, CommentAggregateArgs>): Prisma.PrismaPromise<GetCommentAggregateType<T>>

    /**
     * Group by Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentGroupByArgs['orderBy'] }
        : { orderBy?: CommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Comment model
   */
  readonly fields: CommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    episode<T extends EpisodeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EpisodeDefaultArgs<ExtArgs>>): Prisma__EpisodeClient<$Result.GetResult<Prisma.$EpisodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends ProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfileDefaultArgs<ExtArgs>>): Prisma__ProfileClient<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    parent<T extends Comment$parentArgs<ExtArgs> = {}>(args?: Subset<T, Comment$parentArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    replies<T extends Comment$repliesArgs<ExtArgs> = {}>(args?: Subset<T, Comment$repliesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Comment model
   */
  interface CommentFieldRefs {
    readonly id: FieldRef<"Comment", 'String'>
    readonly episodeId: FieldRef<"Comment", 'String'>
    readonly userId: FieldRef<"Comment", 'String'>
    readonly parentId: FieldRef<"Comment", 'String'>
    readonly body: FieldRef<"Comment", 'String'>
    readonly isSpoiler: FieldRef<"Comment", 'Boolean'>
    readonly isDeleted: FieldRef<"Comment", 'Boolean'>
    readonly createdAt: FieldRef<"Comment", 'DateTime'>
    readonly updatedAt: FieldRef<"Comment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Comment findUnique
   */
  export type CommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findUniqueOrThrow
   */
  export type CommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findFirst
   */
  export type CommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findFirstOrThrow
   */
  export type CommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findMany
   */
  export type CommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comments to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment create
   */
  export type CommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to create a Comment.
     */
    data: XOR<CommentCreateInput, CommentUncheckedCreateInput>
  }

  /**
   * Comment createMany
   */
  export type CommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Comment createManyAndReturn
   */
  export type CommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comment update
   */
  export type CommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to update a Comment.
     */
    data: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
    /**
     * Choose, which Comment to update.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment updateMany
   */
  export type CommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to update.
     */
    limit?: number
  }

  /**
   * Comment updateManyAndReturn
   */
  export type CommentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comment upsert
   */
  export type CommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The filter to search for the Comment to update in case it exists.
     */
    where: CommentWhereUniqueInput
    /**
     * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
     */
    create: XOR<CommentCreateInput, CommentUncheckedCreateInput>
    /**
     * In case the Comment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
  }

  /**
   * Comment delete
   */
  export type CommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter which Comment to delete.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment deleteMany
   */
  export type CommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comments to delete
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to delete.
     */
    limit?: number
  }

  /**
   * Comment.parent
   */
  export type Comment$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
  }

  /**
   * Comment.replies
   */
  export type Comment$repliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment without action
   */
  export type CommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
  }


  /**
   * Model SiteSetting
   */

  export type AggregateSiteSetting = {
    _count: SiteSettingCountAggregateOutputType | null
    _min: SiteSettingMinAggregateOutputType | null
    _max: SiteSettingMaxAggregateOutputType | null
  }

  export type SiteSettingMinAggregateOutputType = {
    key: string | null
    value: string | null
    updatedAt: Date | null
  }

  export type SiteSettingMaxAggregateOutputType = {
    key: string | null
    value: string | null
    updatedAt: Date | null
  }

  export type SiteSettingCountAggregateOutputType = {
    key: number
    value: number
    updatedAt: number
    _all: number
  }


  export type SiteSettingMinAggregateInputType = {
    key?: true
    value?: true
    updatedAt?: true
  }

  export type SiteSettingMaxAggregateInputType = {
    key?: true
    value?: true
    updatedAt?: true
  }

  export type SiteSettingCountAggregateInputType = {
    key?: true
    value?: true
    updatedAt?: true
    _all?: true
  }

  export type SiteSettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SiteSetting to aggregate.
     */
    where?: SiteSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteSettings to fetch.
     */
    orderBy?: SiteSettingOrderByWithRelationInput | SiteSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SiteSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SiteSettings
    **/
    _count?: true | SiteSettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SiteSettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SiteSettingMaxAggregateInputType
  }

  export type GetSiteSettingAggregateType<T extends SiteSettingAggregateArgs> = {
        [P in keyof T & keyof AggregateSiteSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSiteSetting[P]>
      : GetScalarType<T[P], AggregateSiteSetting[P]>
  }




  export type SiteSettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SiteSettingWhereInput
    orderBy?: SiteSettingOrderByWithAggregationInput | SiteSettingOrderByWithAggregationInput[]
    by: SiteSettingScalarFieldEnum[] | SiteSettingScalarFieldEnum
    having?: SiteSettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SiteSettingCountAggregateInputType | true
    _min?: SiteSettingMinAggregateInputType
    _max?: SiteSettingMaxAggregateInputType
  }

  export type SiteSettingGroupByOutputType = {
    key: string
    value: string
    updatedAt: Date
    _count: SiteSettingCountAggregateOutputType | null
    _min: SiteSettingMinAggregateOutputType | null
    _max: SiteSettingMaxAggregateOutputType | null
  }

  type GetSiteSettingGroupByPayload<T extends SiteSettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SiteSettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SiteSettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SiteSettingGroupByOutputType[P]>
            : GetScalarType<T[P], SiteSettingGroupByOutputType[P]>
        }
      >
    >


  export type SiteSettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["siteSetting"]>

  export type SiteSettingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["siteSetting"]>

  export type SiteSettingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["siteSetting"]>

  export type SiteSettingSelectScalar = {
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }

  export type SiteSettingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"key" | "value" | "updatedAt", ExtArgs["result"]["siteSetting"]>

  export type $SiteSettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SiteSetting"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      key: string
      value: string
      updatedAt: Date
    }, ExtArgs["result"]["siteSetting"]>
    composites: {}
  }

  type SiteSettingGetPayload<S extends boolean | null | undefined | SiteSettingDefaultArgs> = $Result.GetResult<Prisma.$SiteSettingPayload, S>

  type SiteSettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SiteSettingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SiteSettingCountAggregateInputType | true
    }

  export interface SiteSettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SiteSetting'], meta: { name: 'SiteSetting' } }
    /**
     * Find zero or one SiteSetting that matches the filter.
     * @param {SiteSettingFindUniqueArgs} args - Arguments to find a SiteSetting
     * @example
     * // Get one SiteSetting
     * const siteSetting = await prisma.siteSetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SiteSettingFindUniqueArgs>(args: SelectSubset<T, SiteSettingFindUniqueArgs<ExtArgs>>): Prisma__SiteSettingClient<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SiteSetting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SiteSettingFindUniqueOrThrowArgs} args - Arguments to find a SiteSetting
     * @example
     * // Get one SiteSetting
     * const siteSetting = await prisma.siteSetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SiteSettingFindUniqueOrThrowArgs>(args: SelectSubset<T, SiteSettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SiteSettingClient<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SiteSetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingFindFirstArgs} args - Arguments to find a SiteSetting
     * @example
     * // Get one SiteSetting
     * const siteSetting = await prisma.siteSetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SiteSettingFindFirstArgs>(args?: SelectSubset<T, SiteSettingFindFirstArgs<ExtArgs>>): Prisma__SiteSettingClient<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SiteSetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingFindFirstOrThrowArgs} args - Arguments to find a SiteSetting
     * @example
     * // Get one SiteSetting
     * const siteSetting = await prisma.siteSetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SiteSettingFindFirstOrThrowArgs>(args?: SelectSubset<T, SiteSettingFindFirstOrThrowArgs<ExtArgs>>): Prisma__SiteSettingClient<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SiteSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SiteSettings
     * const siteSettings = await prisma.siteSetting.findMany()
     * 
     * // Get first 10 SiteSettings
     * const siteSettings = await prisma.siteSetting.findMany({ take: 10 })
     * 
     * // Only select the `key`
     * const siteSettingWithKeyOnly = await prisma.siteSetting.findMany({ select: { key: true } })
     * 
     */
    findMany<T extends SiteSettingFindManyArgs>(args?: SelectSubset<T, SiteSettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SiteSetting.
     * @param {SiteSettingCreateArgs} args - Arguments to create a SiteSetting.
     * @example
     * // Create one SiteSetting
     * const SiteSetting = await prisma.siteSetting.create({
     *   data: {
     *     // ... data to create a SiteSetting
     *   }
     * })
     * 
     */
    create<T extends SiteSettingCreateArgs>(args: SelectSubset<T, SiteSettingCreateArgs<ExtArgs>>): Prisma__SiteSettingClient<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SiteSettings.
     * @param {SiteSettingCreateManyArgs} args - Arguments to create many SiteSettings.
     * @example
     * // Create many SiteSettings
     * const siteSetting = await prisma.siteSetting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SiteSettingCreateManyArgs>(args?: SelectSubset<T, SiteSettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SiteSettings and returns the data saved in the database.
     * @param {SiteSettingCreateManyAndReturnArgs} args - Arguments to create many SiteSettings.
     * @example
     * // Create many SiteSettings
     * const siteSetting = await prisma.siteSetting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SiteSettings and only return the `key`
     * const siteSettingWithKeyOnly = await prisma.siteSetting.createManyAndReturn({
     *   select: { key: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SiteSettingCreateManyAndReturnArgs>(args?: SelectSubset<T, SiteSettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SiteSetting.
     * @param {SiteSettingDeleteArgs} args - Arguments to delete one SiteSetting.
     * @example
     * // Delete one SiteSetting
     * const SiteSetting = await prisma.siteSetting.delete({
     *   where: {
     *     // ... filter to delete one SiteSetting
     *   }
     * })
     * 
     */
    delete<T extends SiteSettingDeleteArgs>(args: SelectSubset<T, SiteSettingDeleteArgs<ExtArgs>>): Prisma__SiteSettingClient<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SiteSetting.
     * @param {SiteSettingUpdateArgs} args - Arguments to update one SiteSetting.
     * @example
     * // Update one SiteSetting
     * const siteSetting = await prisma.siteSetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SiteSettingUpdateArgs>(args: SelectSubset<T, SiteSettingUpdateArgs<ExtArgs>>): Prisma__SiteSettingClient<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SiteSettings.
     * @param {SiteSettingDeleteManyArgs} args - Arguments to filter SiteSettings to delete.
     * @example
     * // Delete a few SiteSettings
     * const { count } = await prisma.siteSetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SiteSettingDeleteManyArgs>(args?: SelectSubset<T, SiteSettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SiteSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SiteSettings
     * const siteSetting = await prisma.siteSetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SiteSettingUpdateManyArgs>(args: SelectSubset<T, SiteSettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SiteSettings and returns the data updated in the database.
     * @param {SiteSettingUpdateManyAndReturnArgs} args - Arguments to update many SiteSettings.
     * @example
     * // Update many SiteSettings
     * const siteSetting = await prisma.siteSetting.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SiteSettings and only return the `key`
     * const siteSettingWithKeyOnly = await prisma.siteSetting.updateManyAndReturn({
     *   select: { key: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SiteSettingUpdateManyAndReturnArgs>(args: SelectSubset<T, SiteSettingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SiteSetting.
     * @param {SiteSettingUpsertArgs} args - Arguments to update or create a SiteSetting.
     * @example
     * // Update or create a SiteSetting
     * const siteSetting = await prisma.siteSetting.upsert({
     *   create: {
     *     // ... data to create a SiteSetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SiteSetting we want to update
     *   }
     * })
     */
    upsert<T extends SiteSettingUpsertArgs>(args: SelectSubset<T, SiteSettingUpsertArgs<ExtArgs>>): Prisma__SiteSettingClient<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SiteSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingCountArgs} args - Arguments to filter SiteSettings to count.
     * @example
     * // Count the number of SiteSettings
     * const count = await prisma.siteSetting.count({
     *   where: {
     *     // ... the filter for the SiteSettings we want to count
     *   }
     * })
    **/
    count<T extends SiteSettingCountArgs>(
      args?: Subset<T, SiteSettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SiteSettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SiteSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SiteSettingAggregateArgs>(args: Subset<T, SiteSettingAggregateArgs>): Prisma.PrismaPromise<GetSiteSettingAggregateType<T>>

    /**
     * Group by SiteSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SiteSettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SiteSettingGroupByArgs['orderBy'] }
        : { orderBy?: SiteSettingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SiteSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiteSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SiteSetting model
   */
  readonly fields: SiteSettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SiteSetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SiteSettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SiteSetting model
   */
  interface SiteSettingFieldRefs {
    readonly key: FieldRef<"SiteSetting", 'String'>
    readonly value: FieldRef<"SiteSetting", 'String'>
    readonly updatedAt: FieldRef<"SiteSetting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SiteSetting findUnique
   */
  export type SiteSettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * Filter, which SiteSetting to fetch.
     */
    where: SiteSettingWhereUniqueInput
  }

  /**
   * SiteSetting findUniqueOrThrow
   */
  export type SiteSettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * Filter, which SiteSetting to fetch.
     */
    where: SiteSettingWhereUniqueInput
  }

  /**
   * SiteSetting findFirst
   */
  export type SiteSettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * Filter, which SiteSetting to fetch.
     */
    where?: SiteSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteSettings to fetch.
     */
    orderBy?: SiteSettingOrderByWithRelationInput | SiteSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SiteSettings.
     */
    cursor?: SiteSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SiteSettings.
     */
    distinct?: SiteSettingScalarFieldEnum | SiteSettingScalarFieldEnum[]
  }

  /**
   * SiteSetting findFirstOrThrow
   */
  export type SiteSettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * Filter, which SiteSetting to fetch.
     */
    where?: SiteSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteSettings to fetch.
     */
    orderBy?: SiteSettingOrderByWithRelationInput | SiteSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SiteSettings.
     */
    cursor?: SiteSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SiteSettings.
     */
    distinct?: SiteSettingScalarFieldEnum | SiteSettingScalarFieldEnum[]
  }

  /**
   * SiteSetting findMany
   */
  export type SiteSettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * Filter, which SiteSettings to fetch.
     */
    where?: SiteSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteSettings to fetch.
     */
    orderBy?: SiteSettingOrderByWithRelationInput | SiteSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SiteSettings.
     */
    cursor?: SiteSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SiteSettings.
     */
    distinct?: SiteSettingScalarFieldEnum | SiteSettingScalarFieldEnum[]
  }

  /**
   * SiteSetting create
   */
  export type SiteSettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * The data needed to create a SiteSetting.
     */
    data: XOR<SiteSettingCreateInput, SiteSettingUncheckedCreateInput>
  }

  /**
   * SiteSetting createMany
   */
  export type SiteSettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SiteSettings.
     */
    data: SiteSettingCreateManyInput | SiteSettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SiteSetting createManyAndReturn
   */
  export type SiteSettingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * The data used to create many SiteSettings.
     */
    data: SiteSettingCreateManyInput | SiteSettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SiteSetting update
   */
  export type SiteSettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * The data needed to update a SiteSetting.
     */
    data: XOR<SiteSettingUpdateInput, SiteSettingUncheckedUpdateInput>
    /**
     * Choose, which SiteSetting to update.
     */
    where: SiteSettingWhereUniqueInput
  }

  /**
   * SiteSetting updateMany
   */
  export type SiteSettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SiteSettings.
     */
    data: XOR<SiteSettingUpdateManyMutationInput, SiteSettingUncheckedUpdateManyInput>
    /**
     * Filter which SiteSettings to update
     */
    where?: SiteSettingWhereInput
    /**
     * Limit how many SiteSettings to update.
     */
    limit?: number
  }

  /**
   * SiteSetting updateManyAndReturn
   */
  export type SiteSettingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * The data used to update SiteSettings.
     */
    data: XOR<SiteSettingUpdateManyMutationInput, SiteSettingUncheckedUpdateManyInput>
    /**
     * Filter which SiteSettings to update
     */
    where?: SiteSettingWhereInput
    /**
     * Limit how many SiteSettings to update.
     */
    limit?: number
  }

  /**
   * SiteSetting upsert
   */
  export type SiteSettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * The filter to search for the SiteSetting to update in case it exists.
     */
    where: SiteSettingWhereUniqueInput
    /**
     * In case the SiteSetting found by the `where` argument doesn't exist, create a new SiteSetting with this data.
     */
    create: XOR<SiteSettingCreateInput, SiteSettingUncheckedCreateInput>
    /**
     * In case the SiteSetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SiteSettingUpdateInput, SiteSettingUncheckedUpdateInput>
  }

  /**
   * SiteSetting delete
   */
  export type SiteSettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * Filter which SiteSetting to delete.
     */
    where: SiteSettingWhereUniqueInput
  }

  /**
   * SiteSetting deleteMany
   */
  export type SiteSettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SiteSettings to delete
     */
    where?: SiteSettingWhereInput
    /**
     * Limit how many SiteSettings to delete.
     */
    limit?: number
  }

  /**
   * SiteSetting without action
   */
  export type SiteSettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    username: 'username',
    displayName: 'displayName',
    avatarUrl: 'avatarUrl',
    role: 'role',
    passwordHash: 'passwordHash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const AnimeScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    title: 'title',
    synopsis: 'synopsis',
    status: 'status',
    type: 'type',
    rating: 'rating',
    score: 'score',
    year: 'year',
    season: 'season',
    posterKey: 'posterKey',
    bannerKey: 'bannerKey',
    totalEpisodes: 'totalEpisodes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AnimeScalarFieldEnum = (typeof AnimeScalarFieldEnum)[keyof typeof AnimeScalarFieldEnum]


  export const GenreScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug'
  };

  export type GenreScalarFieldEnum = (typeof GenreScalarFieldEnum)[keyof typeof GenreScalarFieldEnum]


  export const AnimeGenreScalarFieldEnum: {
    animeId: 'animeId',
    genreId: 'genreId'
  };

  export type AnimeGenreScalarFieldEnum = (typeof AnimeGenreScalarFieldEnum)[keyof typeof AnimeGenreScalarFieldEnum]


  export const EpisodeScalarFieldEnum: {
    id: 'id',
    animeId: 'animeId',
    episodeNumber: 'episodeNumber',
    title: 'title',
    synopsis: 'synopsis',
    durationSeconds: 'durationSeconds',
    thumbnailKey: 'thumbnailKey',
    airedAt: 'airedAt',
    viewCount: 'viewCount',
    createdAt: 'createdAt'
  };

  export type EpisodeScalarFieldEnum = (typeof EpisodeScalarFieldEnum)[keyof typeof EpisodeScalarFieldEnum]


  export const VideoSourceScalarFieldEnum: {
    id: 'id',
    episodeId: 'episodeId',
    quality: 'quality',
    format: 'format',
    r2Key: 'r2Key',
    url: 'url',
    fileSize: 'fileSize',
    isPrimary: 'isPrimary',
    createdAt: 'createdAt'
  };

  export type VideoSourceScalarFieldEnum = (typeof VideoSourceScalarFieldEnum)[keyof typeof VideoSourceScalarFieldEnum]


  export const SubtitleScalarFieldEnum: {
    id: 'id',
    episodeId: 'episodeId',
    language: 'language',
    label: 'label',
    r2Key: 'r2Key',
    createdAt: 'createdAt'
  };

  export type SubtitleScalarFieldEnum = (typeof SubtitleScalarFieldEnum)[keyof typeof SubtitleScalarFieldEnum]


  export const WatchHistoryScalarFieldEnum: {
    userId: 'userId',
    episodeId: 'episodeId',
    progress: 'progress',
    completed: 'completed',
    updatedAt: 'updatedAt'
  };

  export type WatchHistoryScalarFieldEnum = (typeof WatchHistoryScalarFieldEnum)[keyof typeof WatchHistoryScalarFieldEnum]


  export const BookmarkScalarFieldEnum: {
    userId: 'userId',
    animeId: 'animeId',
    status: 'status',
    addedAt: 'addedAt'
  };

  export type BookmarkScalarFieldEnum = (typeof BookmarkScalarFieldEnum)[keyof typeof BookmarkScalarFieldEnum]


  export const CommentScalarFieldEnum: {
    id: 'id',
    episodeId: 'episodeId',
    userId: 'userId',
    parentId: 'parentId',
    body: 'body',
    isSpoiler: 'isSpoiler',
    isDeleted: 'isDeleted',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum]


  export const SiteSettingScalarFieldEnum: {
    key: 'key',
    value: 'value',
    updatedAt: 'updatedAt'
  };

  export type SiteSettingScalarFieldEnum = (typeof SiteSettingScalarFieldEnum)[keyof typeof SiteSettingScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'AnimeStatus'
   */
  export type EnumAnimeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AnimeStatus'>
    


  /**
   * Reference to a field of type 'AnimeStatus[]'
   */
  export type ListEnumAnimeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AnimeStatus[]'>
    


  /**
   * Reference to a field of type 'AnimeType'
   */
  export type EnumAnimeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AnimeType'>
    


  /**
   * Reference to a field of type 'AnimeType[]'
   */
  export type ListEnumAnimeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AnimeType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Season'
   */
  export type EnumSeasonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Season'>
    


  /**
   * Reference to a field of type 'Season[]'
   */
  export type ListEnumSeasonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Season[]'>
    


  /**
   * Reference to a field of type 'VideoQuality'
   */
  export type EnumVideoQualityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VideoQuality'>
    


  /**
   * Reference to a field of type 'VideoQuality[]'
   */
  export type ListEnumVideoQualityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VideoQuality[]'>
    


  /**
   * Reference to a field of type 'VideoFormat'
   */
  export type EnumVideoFormatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VideoFormat'>
    


  /**
   * Reference to a field of type 'VideoFormat[]'
   */
  export type ListEnumVideoFormatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VideoFormat[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'BookmarkStatus'
   */
  export type EnumBookmarkStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookmarkStatus'>
    


  /**
   * Reference to a field of type 'BookmarkStatus[]'
   */
  export type ListEnumBookmarkStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookmarkStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type ProfileWhereInput = {
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    id?: StringFilter<"Profile"> | string
    username?: StringFilter<"Profile"> | string
    displayName?: StringNullableFilter<"Profile"> | string | null
    avatarUrl?: StringNullableFilter<"Profile"> | string | null
    role?: EnumRoleFilter<"Profile"> | $Enums.Role
    passwordHash?: StringNullableFilter<"Profile"> | string | null
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    watchHistory?: WatchHistoryListRelationFilter
    bookmarks?: BookmarkListRelationFilter
    comments?: CommentListRelationFilter
  }

  export type ProfileOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    displayName?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    role?: SortOrder
    passwordHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    watchHistory?: WatchHistoryOrderByRelationAggregateInput
    bookmarks?: BookmarkOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
  }

  export type ProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    AND?: ProfileWhereInput | ProfileWhereInput[]
    OR?: ProfileWhereInput[]
    NOT?: ProfileWhereInput | ProfileWhereInput[]
    displayName?: StringNullableFilter<"Profile"> | string | null
    avatarUrl?: StringNullableFilter<"Profile"> | string | null
    role?: EnumRoleFilter<"Profile"> | $Enums.Role
    passwordHash?: StringNullableFilter<"Profile"> | string | null
    createdAt?: DateTimeFilter<"Profile"> | Date | string
    updatedAt?: DateTimeFilter<"Profile"> | Date | string
    watchHistory?: WatchHistoryListRelationFilter
    bookmarks?: BookmarkListRelationFilter
    comments?: CommentListRelationFilter
  }, "id" | "username">

  export type ProfileOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    displayName?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    role?: SortOrder
    passwordHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProfileCountOrderByAggregateInput
    _max?: ProfileMaxOrderByAggregateInput
    _min?: ProfileMinOrderByAggregateInput
  }

  export type ProfileScalarWhereWithAggregatesInput = {
    AND?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    OR?: ProfileScalarWhereWithAggregatesInput[]
    NOT?: ProfileScalarWhereWithAggregatesInput | ProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Profile"> | string
    username?: StringWithAggregatesFilter<"Profile"> | string
    displayName?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    role?: EnumRoleWithAggregatesFilter<"Profile"> | $Enums.Role
    passwordHash?: StringNullableWithAggregatesFilter<"Profile"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Profile"> | Date | string
  }

  export type AnimeWhereInput = {
    AND?: AnimeWhereInput | AnimeWhereInput[]
    OR?: AnimeWhereInput[]
    NOT?: AnimeWhereInput | AnimeWhereInput[]
    id?: StringFilter<"Anime"> | string
    slug?: StringFilter<"Anime"> | string
    title?: StringFilter<"Anime"> | string
    synopsis?: StringNullableFilter<"Anime"> | string | null
    status?: EnumAnimeStatusFilter<"Anime"> | $Enums.AnimeStatus
    type?: EnumAnimeTypeFilter<"Anime"> | $Enums.AnimeType
    rating?: StringNullableFilter<"Anime"> | string | null
    score?: FloatNullableFilter<"Anime"> | number | null
    year?: IntNullableFilter<"Anime"> | number | null
    season?: EnumSeasonNullableFilter<"Anime"> | $Enums.Season | null
    posterKey?: StringNullableFilter<"Anime"> | string | null
    bannerKey?: StringNullableFilter<"Anime"> | string | null
    totalEpisodes?: IntNullableFilter<"Anime"> | number | null
    createdAt?: DateTimeFilter<"Anime"> | Date | string
    updatedAt?: DateTimeFilter<"Anime"> | Date | string
    genres?: AnimeGenreListRelationFilter
    episodes?: EpisodeListRelationFilter
    bookmarks?: BookmarkListRelationFilter
  }

  export type AnimeOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    synopsis?: SortOrderInput | SortOrder
    status?: SortOrder
    type?: SortOrder
    rating?: SortOrderInput | SortOrder
    score?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    season?: SortOrderInput | SortOrder
    posterKey?: SortOrderInput | SortOrder
    bannerKey?: SortOrderInput | SortOrder
    totalEpisodes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    genres?: AnimeGenreOrderByRelationAggregateInput
    episodes?: EpisodeOrderByRelationAggregateInput
    bookmarks?: BookmarkOrderByRelationAggregateInput
  }

  export type AnimeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: AnimeWhereInput | AnimeWhereInput[]
    OR?: AnimeWhereInput[]
    NOT?: AnimeWhereInput | AnimeWhereInput[]
    title?: StringFilter<"Anime"> | string
    synopsis?: StringNullableFilter<"Anime"> | string | null
    status?: EnumAnimeStatusFilter<"Anime"> | $Enums.AnimeStatus
    type?: EnumAnimeTypeFilter<"Anime"> | $Enums.AnimeType
    rating?: StringNullableFilter<"Anime"> | string | null
    score?: FloatNullableFilter<"Anime"> | number | null
    year?: IntNullableFilter<"Anime"> | number | null
    season?: EnumSeasonNullableFilter<"Anime"> | $Enums.Season | null
    posterKey?: StringNullableFilter<"Anime"> | string | null
    bannerKey?: StringNullableFilter<"Anime"> | string | null
    totalEpisodes?: IntNullableFilter<"Anime"> | number | null
    createdAt?: DateTimeFilter<"Anime"> | Date | string
    updatedAt?: DateTimeFilter<"Anime"> | Date | string
    genres?: AnimeGenreListRelationFilter
    episodes?: EpisodeListRelationFilter
    bookmarks?: BookmarkListRelationFilter
  }, "id" | "slug">

  export type AnimeOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    synopsis?: SortOrderInput | SortOrder
    status?: SortOrder
    type?: SortOrder
    rating?: SortOrderInput | SortOrder
    score?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    season?: SortOrderInput | SortOrder
    posterKey?: SortOrderInput | SortOrder
    bannerKey?: SortOrderInput | SortOrder
    totalEpisodes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AnimeCountOrderByAggregateInput
    _avg?: AnimeAvgOrderByAggregateInput
    _max?: AnimeMaxOrderByAggregateInput
    _min?: AnimeMinOrderByAggregateInput
    _sum?: AnimeSumOrderByAggregateInput
  }

  export type AnimeScalarWhereWithAggregatesInput = {
    AND?: AnimeScalarWhereWithAggregatesInput | AnimeScalarWhereWithAggregatesInput[]
    OR?: AnimeScalarWhereWithAggregatesInput[]
    NOT?: AnimeScalarWhereWithAggregatesInput | AnimeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Anime"> | string
    slug?: StringWithAggregatesFilter<"Anime"> | string
    title?: StringWithAggregatesFilter<"Anime"> | string
    synopsis?: StringNullableWithAggregatesFilter<"Anime"> | string | null
    status?: EnumAnimeStatusWithAggregatesFilter<"Anime"> | $Enums.AnimeStatus
    type?: EnumAnimeTypeWithAggregatesFilter<"Anime"> | $Enums.AnimeType
    rating?: StringNullableWithAggregatesFilter<"Anime"> | string | null
    score?: FloatNullableWithAggregatesFilter<"Anime"> | number | null
    year?: IntNullableWithAggregatesFilter<"Anime"> | number | null
    season?: EnumSeasonNullableWithAggregatesFilter<"Anime"> | $Enums.Season | null
    posterKey?: StringNullableWithAggregatesFilter<"Anime"> | string | null
    bannerKey?: StringNullableWithAggregatesFilter<"Anime"> | string | null
    totalEpisodes?: IntNullableWithAggregatesFilter<"Anime"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Anime"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Anime"> | Date | string
  }

  export type GenreWhereInput = {
    AND?: GenreWhereInput | GenreWhereInput[]
    OR?: GenreWhereInput[]
    NOT?: GenreWhereInput | GenreWhereInput[]
    id?: IntFilter<"Genre"> | number
    name?: StringFilter<"Genre"> | string
    slug?: StringFilter<"Genre"> | string
    animes?: AnimeGenreListRelationFilter
  }

  export type GenreOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    animes?: AnimeGenreOrderByRelationAggregateInput
  }

  export type GenreWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    slug?: string
    AND?: GenreWhereInput | GenreWhereInput[]
    OR?: GenreWhereInput[]
    NOT?: GenreWhereInput | GenreWhereInput[]
    animes?: AnimeGenreListRelationFilter
  }, "id" | "name" | "slug">

  export type GenreOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    _count?: GenreCountOrderByAggregateInput
    _avg?: GenreAvgOrderByAggregateInput
    _max?: GenreMaxOrderByAggregateInput
    _min?: GenreMinOrderByAggregateInput
    _sum?: GenreSumOrderByAggregateInput
  }

  export type GenreScalarWhereWithAggregatesInput = {
    AND?: GenreScalarWhereWithAggregatesInput | GenreScalarWhereWithAggregatesInput[]
    OR?: GenreScalarWhereWithAggregatesInput[]
    NOT?: GenreScalarWhereWithAggregatesInput | GenreScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Genre"> | number
    name?: StringWithAggregatesFilter<"Genre"> | string
    slug?: StringWithAggregatesFilter<"Genre"> | string
  }

  export type AnimeGenreWhereInput = {
    AND?: AnimeGenreWhereInput | AnimeGenreWhereInput[]
    OR?: AnimeGenreWhereInput[]
    NOT?: AnimeGenreWhereInput | AnimeGenreWhereInput[]
    animeId?: StringFilter<"AnimeGenre"> | string
    genreId?: IntFilter<"AnimeGenre"> | number
    anime?: XOR<AnimeScalarRelationFilter, AnimeWhereInput>
    genre?: XOR<GenreScalarRelationFilter, GenreWhereInput>
  }

  export type AnimeGenreOrderByWithRelationInput = {
    animeId?: SortOrder
    genreId?: SortOrder
    anime?: AnimeOrderByWithRelationInput
    genre?: GenreOrderByWithRelationInput
  }

  export type AnimeGenreWhereUniqueInput = Prisma.AtLeast<{
    animeId_genreId?: AnimeGenreAnimeIdGenreIdCompoundUniqueInput
    AND?: AnimeGenreWhereInput | AnimeGenreWhereInput[]
    OR?: AnimeGenreWhereInput[]
    NOT?: AnimeGenreWhereInput | AnimeGenreWhereInput[]
    animeId?: StringFilter<"AnimeGenre"> | string
    genreId?: IntFilter<"AnimeGenre"> | number
    anime?: XOR<AnimeScalarRelationFilter, AnimeWhereInput>
    genre?: XOR<GenreScalarRelationFilter, GenreWhereInput>
  }, "animeId_genreId">

  export type AnimeGenreOrderByWithAggregationInput = {
    animeId?: SortOrder
    genreId?: SortOrder
    _count?: AnimeGenreCountOrderByAggregateInput
    _avg?: AnimeGenreAvgOrderByAggregateInput
    _max?: AnimeGenreMaxOrderByAggregateInput
    _min?: AnimeGenreMinOrderByAggregateInput
    _sum?: AnimeGenreSumOrderByAggregateInput
  }

  export type AnimeGenreScalarWhereWithAggregatesInput = {
    AND?: AnimeGenreScalarWhereWithAggregatesInput | AnimeGenreScalarWhereWithAggregatesInput[]
    OR?: AnimeGenreScalarWhereWithAggregatesInput[]
    NOT?: AnimeGenreScalarWhereWithAggregatesInput | AnimeGenreScalarWhereWithAggregatesInput[]
    animeId?: StringWithAggregatesFilter<"AnimeGenre"> | string
    genreId?: IntWithAggregatesFilter<"AnimeGenre"> | number
  }

  export type EpisodeWhereInput = {
    AND?: EpisodeWhereInput | EpisodeWhereInput[]
    OR?: EpisodeWhereInput[]
    NOT?: EpisodeWhereInput | EpisodeWhereInput[]
    id?: StringFilter<"Episode"> | string
    animeId?: StringFilter<"Episode"> | string
    episodeNumber?: FloatFilter<"Episode"> | number
    title?: StringNullableFilter<"Episode"> | string | null
    synopsis?: StringNullableFilter<"Episode"> | string | null
    durationSeconds?: IntNullableFilter<"Episode"> | number | null
    thumbnailKey?: StringNullableFilter<"Episode"> | string | null
    airedAt?: DateTimeNullableFilter<"Episode"> | Date | string | null
    viewCount?: IntFilter<"Episode"> | number
    createdAt?: DateTimeFilter<"Episode"> | Date | string
    anime?: XOR<AnimeScalarRelationFilter, AnimeWhereInput>
    videoSources?: VideoSourceListRelationFilter
    subtitles?: SubtitleListRelationFilter
    watchHistory?: WatchHistoryListRelationFilter
    comments?: CommentListRelationFilter
  }

  export type EpisodeOrderByWithRelationInput = {
    id?: SortOrder
    animeId?: SortOrder
    episodeNumber?: SortOrder
    title?: SortOrderInput | SortOrder
    synopsis?: SortOrderInput | SortOrder
    durationSeconds?: SortOrderInput | SortOrder
    thumbnailKey?: SortOrderInput | SortOrder
    airedAt?: SortOrderInput | SortOrder
    viewCount?: SortOrder
    createdAt?: SortOrder
    anime?: AnimeOrderByWithRelationInput
    videoSources?: VideoSourceOrderByRelationAggregateInput
    subtitles?: SubtitleOrderByRelationAggregateInput
    watchHistory?: WatchHistoryOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
  }

  export type EpisodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    animeId_episodeNumber?: EpisodeAnimeIdEpisodeNumberCompoundUniqueInput
    AND?: EpisodeWhereInput | EpisodeWhereInput[]
    OR?: EpisodeWhereInput[]
    NOT?: EpisodeWhereInput | EpisodeWhereInput[]
    animeId?: StringFilter<"Episode"> | string
    episodeNumber?: FloatFilter<"Episode"> | number
    title?: StringNullableFilter<"Episode"> | string | null
    synopsis?: StringNullableFilter<"Episode"> | string | null
    durationSeconds?: IntNullableFilter<"Episode"> | number | null
    thumbnailKey?: StringNullableFilter<"Episode"> | string | null
    airedAt?: DateTimeNullableFilter<"Episode"> | Date | string | null
    viewCount?: IntFilter<"Episode"> | number
    createdAt?: DateTimeFilter<"Episode"> | Date | string
    anime?: XOR<AnimeScalarRelationFilter, AnimeWhereInput>
    videoSources?: VideoSourceListRelationFilter
    subtitles?: SubtitleListRelationFilter
    watchHistory?: WatchHistoryListRelationFilter
    comments?: CommentListRelationFilter
  }, "id" | "animeId_episodeNumber">

  export type EpisodeOrderByWithAggregationInput = {
    id?: SortOrder
    animeId?: SortOrder
    episodeNumber?: SortOrder
    title?: SortOrderInput | SortOrder
    synopsis?: SortOrderInput | SortOrder
    durationSeconds?: SortOrderInput | SortOrder
    thumbnailKey?: SortOrderInput | SortOrder
    airedAt?: SortOrderInput | SortOrder
    viewCount?: SortOrder
    createdAt?: SortOrder
    _count?: EpisodeCountOrderByAggregateInput
    _avg?: EpisodeAvgOrderByAggregateInput
    _max?: EpisodeMaxOrderByAggregateInput
    _min?: EpisodeMinOrderByAggregateInput
    _sum?: EpisodeSumOrderByAggregateInput
  }

  export type EpisodeScalarWhereWithAggregatesInput = {
    AND?: EpisodeScalarWhereWithAggregatesInput | EpisodeScalarWhereWithAggregatesInput[]
    OR?: EpisodeScalarWhereWithAggregatesInput[]
    NOT?: EpisodeScalarWhereWithAggregatesInput | EpisodeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Episode"> | string
    animeId?: StringWithAggregatesFilter<"Episode"> | string
    episodeNumber?: FloatWithAggregatesFilter<"Episode"> | number
    title?: StringNullableWithAggregatesFilter<"Episode"> | string | null
    synopsis?: StringNullableWithAggregatesFilter<"Episode"> | string | null
    durationSeconds?: IntNullableWithAggregatesFilter<"Episode"> | number | null
    thumbnailKey?: StringNullableWithAggregatesFilter<"Episode"> | string | null
    airedAt?: DateTimeNullableWithAggregatesFilter<"Episode"> | Date | string | null
    viewCount?: IntWithAggregatesFilter<"Episode"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Episode"> | Date | string
  }

  export type VideoSourceWhereInput = {
    AND?: VideoSourceWhereInput | VideoSourceWhereInput[]
    OR?: VideoSourceWhereInput[]
    NOT?: VideoSourceWhereInput | VideoSourceWhereInput[]
    id?: StringFilter<"VideoSource"> | string
    episodeId?: StringFilter<"VideoSource"> | string
    quality?: EnumVideoQualityFilter<"VideoSource"> | $Enums.VideoQuality
    format?: EnumVideoFormatFilter<"VideoSource"> | $Enums.VideoFormat
    r2Key?: StringFilter<"VideoSource"> | string
    url?: StringNullableFilter<"VideoSource"> | string | null
    fileSize?: IntNullableFilter<"VideoSource"> | number | null
    isPrimary?: BoolFilter<"VideoSource"> | boolean
    createdAt?: DateTimeFilter<"VideoSource"> | Date | string
    episode?: XOR<EpisodeScalarRelationFilter, EpisodeWhereInput>
  }

  export type VideoSourceOrderByWithRelationInput = {
    id?: SortOrder
    episodeId?: SortOrder
    quality?: SortOrder
    format?: SortOrder
    r2Key?: SortOrder
    url?: SortOrderInput | SortOrder
    fileSize?: SortOrderInput | SortOrder
    isPrimary?: SortOrder
    createdAt?: SortOrder
    episode?: EpisodeOrderByWithRelationInput
  }

  export type VideoSourceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VideoSourceWhereInput | VideoSourceWhereInput[]
    OR?: VideoSourceWhereInput[]
    NOT?: VideoSourceWhereInput | VideoSourceWhereInput[]
    episodeId?: StringFilter<"VideoSource"> | string
    quality?: EnumVideoQualityFilter<"VideoSource"> | $Enums.VideoQuality
    format?: EnumVideoFormatFilter<"VideoSource"> | $Enums.VideoFormat
    r2Key?: StringFilter<"VideoSource"> | string
    url?: StringNullableFilter<"VideoSource"> | string | null
    fileSize?: IntNullableFilter<"VideoSource"> | number | null
    isPrimary?: BoolFilter<"VideoSource"> | boolean
    createdAt?: DateTimeFilter<"VideoSource"> | Date | string
    episode?: XOR<EpisodeScalarRelationFilter, EpisodeWhereInput>
  }, "id">

  export type VideoSourceOrderByWithAggregationInput = {
    id?: SortOrder
    episodeId?: SortOrder
    quality?: SortOrder
    format?: SortOrder
    r2Key?: SortOrder
    url?: SortOrderInput | SortOrder
    fileSize?: SortOrderInput | SortOrder
    isPrimary?: SortOrder
    createdAt?: SortOrder
    _count?: VideoSourceCountOrderByAggregateInput
    _avg?: VideoSourceAvgOrderByAggregateInput
    _max?: VideoSourceMaxOrderByAggregateInput
    _min?: VideoSourceMinOrderByAggregateInput
    _sum?: VideoSourceSumOrderByAggregateInput
  }

  export type VideoSourceScalarWhereWithAggregatesInput = {
    AND?: VideoSourceScalarWhereWithAggregatesInput | VideoSourceScalarWhereWithAggregatesInput[]
    OR?: VideoSourceScalarWhereWithAggregatesInput[]
    NOT?: VideoSourceScalarWhereWithAggregatesInput | VideoSourceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VideoSource"> | string
    episodeId?: StringWithAggregatesFilter<"VideoSource"> | string
    quality?: EnumVideoQualityWithAggregatesFilter<"VideoSource"> | $Enums.VideoQuality
    format?: EnumVideoFormatWithAggregatesFilter<"VideoSource"> | $Enums.VideoFormat
    r2Key?: StringWithAggregatesFilter<"VideoSource"> | string
    url?: StringNullableWithAggregatesFilter<"VideoSource"> | string | null
    fileSize?: IntNullableWithAggregatesFilter<"VideoSource"> | number | null
    isPrimary?: BoolWithAggregatesFilter<"VideoSource"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"VideoSource"> | Date | string
  }

  export type SubtitleWhereInput = {
    AND?: SubtitleWhereInput | SubtitleWhereInput[]
    OR?: SubtitleWhereInput[]
    NOT?: SubtitleWhereInput | SubtitleWhereInput[]
    id?: StringFilter<"Subtitle"> | string
    episodeId?: StringFilter<"Subtitle"> | string
    language?: StringFilter<"Subtitle"> | string
    label?: StringFilter<"Subtitle"> | string
    r2Key?: StringFilter<"Subtitle"> | string
    createdAt?: DateTimeFilter<"Subtitle"> | Date | string
    episode?: XOR<EpisodeScalarRelationFilter, EpisodeWhereInput>
  }

  export type SubtitleOrderByWithRelationInput = {
    id?: SortOrder
    episodeId?: SortOrder
    language?: SortOrder
    label?: SortOrder
    r2Key?: SortOrder
    createdAt?: SortOrder
    episode?: EpisodeOrderByWithRelationInput
  }

  export type SubtitleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SubtitleWhereInput | SubtitleWhereInput[]
    OR?: SubtitleWhereInput[]
    NOT?: SubtitleWhereInput | SubtitleWhereInput[]
    episodeId?: StringFilter<"Subtitle"> | string
    language?: StringFilter<"Subtitle"> | string
    label?: StringFilter<"Subtitle"> | string
    r2Key?: StringFilter<"Subtitle"> | string
    createdAt?: DateTimeFilter<"Subtitle"> | Date | string
    episode?: XOR<EpisodeScalarRelationFilter, EpisodeWhereInput>
  }, "id">

  export type SubtitleOrderByWithAggregationInput = {
    id?: SortOrder
    episodeId?: SortOrder
    language?: SortOrder
    label?: SortOrder
    r2Key?: SortOrder
    createdAt?: SortOrder
    _count?: SubtitleCountOrderByAggregateInput
    _max?: SubtitleMaxOrderByAggregateInput
    _min?: SubtitleMinOrderByAggregateInput
  }

  export type SubtitleScalarWhereWithAggregatesInput = {
    AND?: SubtitleScalarWhereWithAggregatesInput | SubtitleScalarWhereWithAggregatesInput[]
    OR?: SubtitleScalarWhereWithAggregatesInput[]
    NOT?: SubtitleScalarWhereWithAggregatesInput | SubtitleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Subtitle"> | string
    episodeId?: StringWithAggregatesFilter<"Subtitle"> | string
    language?: StringWithAggregatesFilter<"Subtitle"> | string
    label?: StringWithAggregatesFilter<"Subtitle"> | string
    r2Key?: StringWithAggregatesFilter<"Subtitle"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Subtitle"> | Date | string
  }

  export type WatchHistoryWhereInput = {
    AND?: WatchHistoryWhereInput | WatchHistoryWhereInput[]
    OR?: WatchHistoryWhereInput[]
    NOT?: WatchHistoryWhereInput | WatchHistoryWhereInput[]
    userId?: StringFilter<"WatchHistory"> | string
    episodeId?: StringFilter<"WatchHistory"> | string
    progress?: IntFilter<"WatchHistory"> | number
    completed?: BoolFilter<"WatchHistory"> | boolean
    updatedAt?: DateTimeFilter<"WatchHistory"> | Date | string
    user?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    episode?: XOR<EpisodeScalarRelationFilter, EpisodeWhereInput>
  }

  export type WatchHistoryOrderByWithRelationInput = {
    userId?: SortOrder
    episodeId?: SortOrder
    progress?: SortOrder
    completed?: SortOrder
    updatedAt?: SortOrder
    user?: ProfileOrderByWithRelationInput
    episode?: EpisodeOrderByWithRelationInput
  }

  export type WatchHistoryWhereUniqueInput = Prisma.AtLeast<{
    userId_episodeId?: WatchHistoryUserIdEpisodeIdCompoundUniqueInput
    AND?: WatchHistoryWhereInput | WatchHistoryWhereInput[]
    OR?: WatchHistoryWhereInput[]
    NOT?: WatchHistoryWhereInput | WatchHistoryWhereInput[]
    userId?: StringFilter<"WatchHistory"> | string
    episodeId?: StringFilter<"WatchHistory"> | string
    progress?: IntFilter<"WatchHistory"> | number
    completed?: BoolFilter<"WatchHistory"> | boolean
    updatedAt?: DateTimeFilter<"WatchHistory"> | Date | string
    user?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    episode?: XOR<EpisodeScalarRelationFilter, EpisodeWhereInput>
  }, "userId_episodeId">

  export type WatchHistoryOrderByWithAggregationInput = {
    userId?: SortOrder
    episodeId?: SortOrder
    progress?: SortOrder
    completed?: SortOrder
    updatedAt?: SortOrder
    _count?: WatchHistoryCountOrderByAggregateInput
    _avg?: WatchHistoryAvgOrderByAggregateInput
    _max?: WatchHistoryMaxOrderByAggregateInput
    _min?: WatchHistoryMinOrderByAggregateInput
    _sum?: WatchHistorySumOrderByAggregateInput
  }

  export type WatchHistoryScalarWhereWithAggregatesInput = {
    AND?: WatchHistoryScalarWhereWithAggregatesInput | WatchHistoryScalarWhereWithAggregatesInput[]
    OR?: WatchHistoryScalarWhereWithAggregatesInput[]
    NOT?: WatchHistoryScalarWhereWithAggregatesInput | WatchHistoryScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"WatchHistory"> | string
    episodeId?: StringWithAggregatesFilter<"WatchHistory"> | string
    progress?: IntWithAggregatesFilter<"WatchHistory"> | number
    completed?: BoolWithAggregatesFilter<"WatchHistory"> | boolean
    updatedAt?: DateTimeWithAggregatesFilter<"WatchHistory"> | Date | string
  }

  export type BookmarkWhereInput = {
    AND?: BookmarkWhereInput | BookmarkWhereInput[]
    OR?: BookmarkWhereInput[]
    NOT?: BookmarkWhereInput | BookmarkWhereInput[]
    userId?: StringFilter<"Bookmark"> | string
    animeId?: StringFilter<"Bookmark"> | string
    status?: EnumBookmarkStatusFilter<"Bookmark"> | $Enums.BookmarkStatus
    addedAt?: DateTimeFilter<"Bookmark"> | Date | string
    user?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    anime?: XOR<AnimeScalarRelationFilter, AnimeWhereInput>
  }

  export type BookmarkOrderByWithRelationInput = {
    userId?: SortOrder
    animeId?: SortOrder
    status?: SortOrder
    addedAt?: SortOrder
    user?: ProfileOrderByWithRelationInput
    anime?: AnimeOrderByWithRelationInput
  }

  export type BookmarkWhereUniqueInput = Prisma.AtLeast<{
    userId_animeId?: BookmarkUserIdAnimeIdCompoundUniqueInput
    AND?: BookmarkWhereInput | BookmarkWhereInput[]
    OR?: BookmarkWhereInput[]
    NOT?: BookmarkWhereInput | BookmarkWhereInput[]
    userId?: StringFilter<"Bookmark"> | string
    animeId?: StringFilter<"Bookmark"> | string
    status?: EnumBookmarkStatusFilter<"Bookmark"> | $Enums.BookmarkStatus
    addedAt?: DateTimeFilter<"Bookmark"> | Date | string
    user?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    anime?: XOR<AnimeScalarRelationFilter, AnimeWhereInput>
  }, "userId_animeId">

  export type BookmarkOrderByWithAggregationInput = {
    userId?: SortOrder
    animeId?: SortOrder
    status?: SortOrder
    addedAt?: SortOrder
    _count?: BookmarkCountOrderByAggregateInput
    _max?: BookmarkMaxOrderByAggregateInput
    _min?: BookmarkMinOrderByAggregateInput
  }

  export type BookmarkScalarWhereWithAggregatesInput = {
    AND?: BookmarkScalarWhereWithAggregatesInput | BookmarkScalarWhereWithAggregatesInput[]
    OR?: BookmarkScalarWhereWithAggregatesInput[]
    NOT?: BookmarkScalarWhereWithAggregatesInput | BookmarkScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"Bookmark"> | string
    animeId?: StringWithAggregatesFilter<"Bookmark"> | string
    status?: EnumBookmarkStatusWithAggregatesFilter<"Bookmark"> | $Enums.BookmarkStatus
    addedAt?: DateTimeWithAggregatesFilter<"Bookmark"> | Date | string
  }

  export type CommentWhereInput = {
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    id?: StringFilter<"Comment"> | string
    episodeId?: StringFilter<"Comment"> | string
    userId?: StringFilter<"Comment"> | string
    parentId?: StringNullableFilter<"Comment"> | string | null
    body?: StringFilter<"Comment"> | string
    isSpoiler?: BoolFilter<"Comment"> | boolean
    isDeleted?: BoolFilter<"Comment"> | boolean
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    updatedAt?: DateTimeFilter<"Comment"> | Date | string
    episode?: XOR<EpisodeScalarRelationFilter, EpisodeWhereInput>
    user?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    parent?: XOR<CommentNullableScalarRelationFilter, CommentWhereInput> | null
    replies?: CommentListRelationFilter
  }

  export type CommentOrderByWithRelationInput = {
    id?: SortOrder
    episodeId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrderInput | SortOrder
    body?: SortOrder
    isSpoiler?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    episode?: EpisodeOrderByWithRelationInput
    user?: ProfileOrderByWithRelationInput
    parent?: CommentOrderByWithRelationInput
    replies?: CommentOrderByRelationAggregateInput
  }

  export type CommentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    episodeId?: StringFilter<"Comment"> | string
    userId?: StringFilter<"Comment"> | string
    parentId?: StringNullableFilter<"Comment"> | string | null
    body?: StringFilter<"Comment"> | string
    isSpoiler?: BoolFilter<"Comment"> | boolean
    isDeleted?: BoolFilter<"Comment"> | boolean
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    updatedAt?: DateTimeFilter<"Comment"> | Date | string
    episode?: XOR<EpisodeScalarRelationFilter, EpisodeWhereInput>
    user?: XOR<ProfileScalarRelationFilter, ProfileWhereInput>
    parent?: XOR<CommentNullableScalarRelationFilter, CommentWhereInput> | null
    replies?: CommentListRelationFilter
  }, "id">

  export type CommentOrderByWithAggregationInput = {
    id?: SortOrder
    episodeId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrderInput | SortOrder
    body?: SortOrder
    isSpoiler?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CommentCountOrderByAggregateInput
    _max?: CommentMaxOrderByAggregateInput
    _min?: CommentMinOrderByAggregateInput
  }

  export type CommentScalarWhereWithAggregatesInput = {
    AND?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    OR?: CommentScalarWhereWithAggregatesInput[]
    NOT?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Comment"> | string
    episodeId?: StringWithAggregatesFilter<"Comment"> | string
    userId?: StringWithAggregatesFilter<"Comment"> | string
    parentId?: StringNullableWithAggregatesFilter<"Comment"> | string | null
    body?: StringWithAggregatesFilter<"Comment"> | string
    isSpoiler?: BoolWithAggregatesFilter<"Comment"> | boolean
    isDeleted?: BoolWithAggregatesFilter<"Comment"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
  }

  export type SiteSettingWhereInput = {
    AND?: SiteSettingWhereInput | SiteSettingWhereInput[]
    OR?: SiteSettingWhereInput[]
    NOT?: SiteSettingWhereInput | SiteSettingWhereInput[]
    key?: StringFilter<"SiteSetting"> | string
    value?: StringFilter<"SiteSetting"> | string
    updatedAt?: DateTimeFilter<"SiteSetting"> | Date | string
  }

  export type SiteSettingOrderByWithRelationInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteSettingWhereUniqueInput = Prisma.AtLeast<{
    key?: string
    AND?: SiteSettingWhereInput | SiteSettingWhereInput[]
    OR?: SiteSettingWhereInput[]
    NOT?: SiteSettingWhereInput | SiteSettingWhereInput[]
    value?: StringFilter<"SiteSetting"> | string
    updatedAt?: DateTimeFilter<"SiteSetting"> | Date | string
  }, "key">

  export type SiteSettingOrderByWithAggregationInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
    _count?: SiteSettingCountOrderByAggregateInput
    _max?: SiteSettingMaxOrderByAggregateInput
    _min?: SiteSettingMinOrderByAggregateInput
  }

  export type SiteSettingScalarWhereWithAggregatesInput = {
    AND?: SiteSettingScalarWhereWithAggregatesInput | SiteSettingScalarWhereWithAggregatesInput[]
    OR?: SiteSettingScalarWhereWithAggregatesInput[]
    NOT?: SiteSettingScalarWhereWithAggregatesInput | SiteSettingScalarWhereWithAggregatesInput[]
    key?: StringWithAggregatesFilter<"SiteSetting"> | string
    value?: StringWithAggregatesFilter<"SiteSetting"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"SiteSetting"> | Date | string
  }

  export type ProfileCreateInput = {
    id: string
    username: string
    displayName?: string | null
    avatarUrl?: string | null
    role?: $Enums.Role
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    watchHistory?: WatchHistoryCreateNestedManyWithoutUserInput
    bookmarks?: BookmarkCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
  }

  export type ProfileUncheckedCreateInput = {
    id: string
    username: string
    displayName?: string | null
    avatarUrl?: string | null
    role?: $Enums.Role
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    watchHistory?: WatchHistoryUncheckedCreateNestedManyWithoutUserInput
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
  }

  export type ProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    watchHistory?: WatchHistoryUpdateManyWithoutUserNestedInput
    bookmarks?: BookmarkUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
  }

  export type ProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    watchHistory?: WatchHistoryUncheckedUpdateManyWithoutUserNestedInput
    bookmarks?: BookmarkUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProfileCreateManyInput = {
    id: string
    username: string
    displayName?: string | null
    avatarUrl?: string | null
    role?: $Enums.Role
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnimeCreateInput = {
    id: string
    slug: string
    title: string
    synopsis?: string | null
    status: $Enums.AnimeStatus
    type: $Enums.AnimeType
    rating?: string | null
    score?: number | null
    year?: number | null
    season?: $Enums.Season | null
    posterKey?: string | null
    bannerKey?: string | null
    totalEpisodes?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    genres?: AnimeGenreCreateNestedManyWithoutAnimeInput
    episodes?: EpisodeCreateNestedManyWithoutAnimeInput
    bookmarks?: BookmarkCreateNestedManyWithoutAnimeInput
  }

  export type AnimeUncheckedCreateInput = {
    id: string
    slug: string
    title: string
    synopsis?: string | null
    status: $Enums.AnimeStatus
    type: $Enums.AnimeType
    rating?: string | null
    score?: number | null
    year?: number | null
    season?: $Enums.Season | null
    posterKey?: string | null
    bannerKey?: string | null
    totalEpisodes?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    genres?: AnimeGenreUncheckedCreateNestedManyWithoutAnimeInput
    episodes?: EpisodeUncheckedCreateNestedManyWithoutAnimeInput
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutAnimeInput
  }

  export type AnimeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAnimeStatusFieldUpdateOperationsInput | $Enums.AnimeStatus
    type?: EnumAnimeTypeFieldUpdateOperationsInput | $Enums.AnimeType
    rating?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    season?: NullableEnumSeasonFieldUpdateOperationsInput | $Enums.Season | null
    posterKey?: NullableStringFieldUpdateOperationsInput | string | null
    bannerKey?: NullableStringFieldUpdateOperationsInput | string | null
    totalEpisodes?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    genres?: AnimeGenreUpdateManyWithoutAnimeNestedInput
    episodes?: EpisodeUpdateManyWithoutAnimeNestedInput
    bookmarks?: BookmarkUpdateManyWithoutAnimeNestedInput
  }

  export type AnimeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAnimeStatusFieldUpdateOperationsInput | $Enums.AnimeStatus
    type?: EnumAnimeTypeFieldUpdateOperationsInput | $Enums.AnimeType
    rating?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    season?: NullableEnumSeasonFieldUpdateOperationsInput | $Enums.Season | null
    posterKey?: NullableStringFieldUpdateOperationsInput | string | null
    bannerKey?: NullableStringFieldUpdateOperationsInput | string | null
    totalEpisodes?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    genres?: AnimeGenreUncheckedUpdateManyWithoutAnimeNestedInput
    episodes?: EpisodeUncheckedUpdateManyWithoutAnimeNestedInput
    bookmarks?: BookmarkUncheckedUpdateManyWithoutAnimeNestedInput
  }

  export type AnimeCreateManyInput = {
    id: string
    slug: string
    title: string
    synopsis?: string | null
    status: $Enums.AnimeStatus
    type: $Enums.AnimeType
    rating?: string | null
    score?: number | null
    year?: number | null
    season?: $Enums.Season | null
    posterKey?: string | null
    bannerKey?: string | null
    totalEpisodes?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnimeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAnimeStatusFieldUpdateOperationsInput | $Enums.AnimeStatus
    type?: EnumAnimeTypeFieldUpdateOperationsInput | $Enums.AnimeType
    rating?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    season?: NullableEnumSeasonFieldUpdateOperationsInput | $Enums.Season | null
    posterKey?: NullableStringFieldUpdateOperationsInput | string | null
    bannerKey?: NullableStringFieldUpdateOperationsInput | string | null
    totalEpisodes?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnimeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAnimeStatusFieldUpdateOperationsInput | $Enums.AnimeStatus
    type?: EnumAnimeTypeFieldUpdateOperationsInput | $Enums.AnimeType
    rating?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    season?: NullableEnumSeasonFieldUpdateOperationsInput | $Enums.Season | null
    posterKey?: NullableStringFieldUpdateOperationsInput | string | null
    bannerKey?: NullableStringFieldUpdateOperationsInput | string | null
    totalEpisodes?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GenreCreateInput = {
    name: string
    slug: string
    animes?: AnimeGenreCreateNestedManyWithoutGenreInput
  }

  export type GenreUncheckedCreateInput = {
    id?: number
    name: string
    slug: string
    animes?: AnimeGenreUncheckedCreateNestedManyWithoutGenreInput
  }

  export type GenreUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    animes?: AnimeGenreUpdateManyWithoutGenreNestedInput
  }

  export type GenreUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    animes?: AnimeGenreUncheckedUpdateManyWithoutGenreNestedInput
  }

  export type GenreCreateManyInput = {
    id?: number
    name: string
    slug: string
  }

  export type GenreUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type GenreUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type AnimeGenreCreateInput = {
    anime: AnimeCreateNestedOneWithoutGenresInput
    genre: GenreCreateNestedOneWithoutAnimesInput
  }

  export type AnimeGenreUncheckedCreateInput = {
    animeId: string
    genreId: number
  }

  export type AnimeGenreUpdateInput = {
    anime?: AnimeUpdateOneRequiredWithoutGenresNestedInput
    genre?: GenreUpdateOneRequiredWithoutAnimesNestedInput
  }

  export type AnimeGenreUncheckedUpdateInput = {
    animeId?: StringFieldUpdateOperationsInput | string
    genreId?: IntFieldUpdateOperationsInput | number
  }

  export type AnimeGenreCreateManyInput = {
    animeId: string
    genreId: number
  }

  export type AnimeGenreUpdateManyMutationInput = {

  }

  export type AnimeGenreUncheckedUpdateManyInput = {
    animeId?: StringFieldUpdateOperationsInput | string
    genreId?: IntFieldUpdateOperationsInput | number
  }

  export type EpisodeCreateInput = {
    id: string
    episodeNumber: number
    title?: string | null
    synopsis?: string | null
    durationSeconds?: number | null
    thumbnailKey?: string | null
    airedAt?: Date | string | null
    viewCount?: number
    createdAt?: Date | string
    anime: AnimeCreateNestedOneWithoutEpisodesInput
    videoSources?: VideoSourceCreateNestedManyWithoutEpisodeInput
    subtitles?: SubtitleCreateNestedManyWithoutEpisodeInput
    watchHistory?: WatchHistoryCreateNestedManyWithoutEpisodeInput
    comments?: CommentCreateNestedManyWithoutEpisodeInput
  }

  export type EpisodeUncheckedCreateInput = {
    id: string
    animeId: string
    episodeNumber: number
    title?: string | null
    synopsis?: string | null
    durationSeconds?: number | null
    thumbnailKey?: string | null
    airedAt?: Date | string | null
    viewCount?: number
    createdAt?: Date | string
    videoSources?: VideoSourceUncheckedCreateNestedManyWithoutEpisodeInput
    subtitles?: SubtitleUncheckedCreateNestedManyWithoutEpisodeInput
    watchHistory?: WatchHistoryUncheckedCreateNestedManyWithoutEpisodeInput
    comments?: CommentUncheckedCreateNestedManyWithoutEpisodeInput
  }

  export type EpisodeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    episodeNumber?: FloatFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailKey?: NullableStringFieldUpdateOperationsInput | string | null
    airedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    anime?: AnimeUpdateOneRequiredWithoutEpisodesNestedInput
    videoSources?: VideoSourceUpdateManyWithoutEpisodeNestedInput
    subtitles?: SubtitleUpdateManyWithoutEpisodeNestedInput
    watchHistory?: WatchHistoryUpdateManyWithoutEpisodeNestedInput
    comments?: CommentUpdateManyWithoutEpisodeNestedInput
  }

  export type EpisodeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    animeId?: StringFieldUpdateOperationsInput | string
    episodeNumber?: FloatFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailKey?: NullableStringFieldUpdateOperationsInput | string | null
    airedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videoSources?: VideoSourceUncheckedUpdateManyWithoutEpisodeNestedInput
    subtitles?: SubtitleUncheckedUpdateManyWithoutEpisodeNestedInput
    watchHistory?: WatchHistoryUncheckedUpdateManyWithoutEpisodeNestedInput
    comments?: CommentUncheckedUpdateManyWithoutEpisodeNestedInput
  }

  export type EpisodeCreateManyInput = {
    id: string
    animeId: string
    episodeNumber: number
    title?: string | null
    synopsis?: string | null
    durationSeconds?: number | null
    thumbnailKey?: string | null
    airedAt?: Date | string | null
    viewCount?: number
    createdAt?: Date | string
  }

  export type EpisodeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    episodeNumber?: FloatFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailKey?: NullableStringFieldUpdateOperationsInput | string | null
    airedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EpisodeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    animeId?: StringFieldUpdateOperationsInput | string
    episodeNumber?: FloatFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailKey?: NullableStringFieldUpdateOperationsInput | string | null
    airedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoSourceCreateInput = {
    id: string
    quality: $Enums.VideoQuality
    format: $Enums.VideoFormat
    r2Key: string
    url?: string | null
    fileSize?: number | null
    isPrimary?: boolean
    createdAt?: Date | string
    episode: EpisodeCreateNestedOneWithoutVideoSourcesInput
  }

  export type VideoSourceUncheckedCreateInput = {
    id: string
    episodeId: string
    quality: $Enums.VideoQuality
    format: $Enums.VideoFormat
    r2Key: string
    url?: string | null
    fileSize?: number | null
    isPrimary?: boolean
    createdAt?: Date | string
  }

  export type VideoSourceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quality?: EnumVideoQualityFieldUpdateOperationsInput | $Enums.VideoQuality
    format?: EnumVideoFormatFieldUpdateOperationsInput | $Enums.VideoFormat
    r2Key?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    episode?: EpisodeUpdateOneRequiredWithoutVideoSourcesNestedInput
  }

  export type VideoSourceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    episodeId?: StringFieldUpdateOperationsInput | string
    quality?: EnumVideoQualityFieldUpdateOperationsInput | $Enums.VideoQuality
    format?: EnumVideoFormatFieldUpdateOperationsInput | $Enums.VideoFormat
    r2Key?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoSourceCreateManyInput = {
    id: string
    episodeId: string
    quality: $Enums.VideoQuality
    format: $Enums.VideoFormat
    r2Key: string
    url?: string | null
    fileSize?: number | null
    isPrimary?: boolean
    createdAt?: Date | string
  }

  export type VideoSourceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quality?: EnumVideoQualityFieldUpdateOperationsInput | $Enums.VideoQuality
    format?: EnumVideoFormatFieldUpdateOperationsInput | $Enums.VideoFormat
    r2Key?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoSourceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    episodeId?: StringFieldUpdateOperationsInput | string
    quality?: EnumVideoQualityFieldUpdateOperationsInput | $Enums.VideoQuality
    format?: EnumVideoFormatFieldUpdateOperationsInput | $Enums.VideoFormat
    r2Key?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubtitleCreateInput = {
    id: string
    language: string
    label: string
    r2Key: string
    createdAt?: Date | string
    episode: EpisodeCreateNestedOneWithoutSubtitlesInput
  }

  export type SubtitleUncheckedCreateInput = {
    id: string
    episodeId: string
    language: string
    label: string
    r2Key: string
    createdAt?: Date | string
  }

  export type SubtitleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    r2Key?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    episode?: EpisodeUpdateOneRequiredWithoutSubtitlesNestedInput
  }

  export type SubtitleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    episodeId?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    r2Key?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubtitleCreateManyInput = {
    id: string
    episodeId: string
    language: string
    label: string
    r2Key: string
    createdAt?: Date | string
  }

  export type SubtitleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    r2Key?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubtitleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    episodeId?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    r2Key?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchHistoryCreateInput = {
    progress?: number
    completed?: boolean
    updatedAt?: Date | string
    user: ProfileCreateNestedOneWithoutWatchHistoryInput
    episode: EpisodeCreateNestedOneWithoutWatchHistoryInput
  }

  export type WatchHistoryUncheckedCreateInput = {
    userId: string
    episodeId: string
    progress?: number
    completed?: boolean
    updatedAt?: Date | string
  }

  export type WatchHistoryUpdateInput = {
    progress?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: ProfileUpdateOneRequiredWithoutWatchHistoryNestedInput
    episode?: EpisodeUpdateOneRequiredWithoutWatchHistoryNestedInput
  }

  export type WatchHistoryUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    episodeId?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchHistoryCreateManyInput = {
    userId: string
    episodeId: string
    progress?: number
    completed?: boolean
    updatedAt?: Date | string
  }

  export type WatchHistoryUpdateManyMutationInput = {
    progress?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchHistoryUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    episodeId?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookmarkCreateInput = {
    status?: $Enums.BookmarkStatus
    addedAt?: Date | string
    user: ProfileCreateNestedOneWithoutBookmarksInput
    anime: AnimeCreateNestedOneWithoutBookmarksInput
  }

  export type BookmarkUncheckedCreateInput = {
    userId: string
    animeId: string
    status?: $Enums.BookmarkStatus
    addedAt?: Date | string
  }

  export type BookmarkUpdateInput = {
    status?: EnumBookmarkStatusFieldUpdateOperationsInput | $Enums.BookmarkStatus
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: ProfileUpdateOneRequiredWithoutBookmarksNestedInput
    anime?: AnimeUpdateOneRequiredWithoutBookmarksNestedInput
  }

  export type BookmarkUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    animeId?: StringFieldUpdateOperationsInput | string
    status?: EnumBookmarkStatusFieldUpdateOperationsInput | $Enums.BookmarkStatus
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookmarkCreateManyInput = {
    userId: string
    animeId: string
    status?: $Enums.BookmarkStatus
    addedAt?: Date | string
  }

  export type BookmarkUpdateManyMutationInput = {
    status?: EnumBookmarkStatusFieldUpdateOperationsInput | $Enums.BookmarkStatus
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookmarkUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    animeId?: StringFieldUpdateOperationsInput | string
    status?: EnumBookmarkStatusFieldUpdateOperationsInput | $Enums.BookmarkStatus
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCreateInput = {
    id: string
    body: string
    isSpoiler?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    episode: EpisodeCreateNestedOneWithoutCommentsInput
    user: ProfileCreateNestedOneWithoutCommentsInput
    parent?: CommentCreateNestedOneWithoutRepliesInput
    replies?: CommentCreateNestedManyWithoutParentInput
  }

  export type CommentUncheckedCreateInput = {
    id: string
    episodeId: string
    userId: string
    parentId?: string | null
    body: string
    isSpoiler?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    replies?: CommentUncheckedCreateNestedManyWithoutParentInput
  }

  export type CommentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    isSpoiler?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    episode?: EpisodeUpdateOneRequiredWithoutCommentsNestedInput
    user?: ProfileUpdateOneRequiredWithoutCommentsNestedInput
    parent?: CommentUpdateOneWithoutRepliesNestedInput
    replies?: CommentUpdateManyWithoutParentNestedInput
  }

  export type CommentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    episodeId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    isSpoiler?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: CommentUncheckedUpdateManyWithoutParentNestedInput
  }

  export type CommentCreateManyInput = {
    id: string
    episodeId: string
    userId: string
    parentId?: string | null
    body: string
    isSpoiler?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    isSpoiler?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    episodeId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    isSpoiler?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteSettingCreateInput = {
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type SiteSettingUncheckedCreateInput = {
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type SiteSettingUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteSettingUncheckedUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteSettingCreateManyInput = {
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type SiteSettingUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteSettingUncheckedUpdateManyInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type WatchHistoryListRelationFilter = {
    every?: WatchHistoryWhereInput
    some?: WatchHistoryWhereInput
    none?: WatchHistoryWhereInput
  }

  export type BookmarkListRelationFilter = {
    every?: BookmarkWhereInput
    some?: BookmarkWhereInput
    none?: BookmarkWhereInput
  }

  export type CommentListRelationFilter = {
    every?: CommentWhereInput
    some?: CommentWhereInput
    none?: CommentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type WatchHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookmarkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProfileCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    displayName?: SortOrder
    avatarUrl?: SortOrder
    role?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    displayName?: SortOrder
    avatarUrl?: SortOrder
    role?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfileMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    displayName?: SortOrder
    avatarUrl?: SortOrder
    role?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumAnimeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AnimeStatus | EnumAnimeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AnimeStatus[] | ListEnumAnimeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnimeStatus[] | ListEnumAnimeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAnimeStatusFilter<$PrismaModel> | $Enums.AnimeStatus
  }

  export type EnumAnimeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AnimeType | EnumAnimeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AnimeType[] | ListEnumAnimeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnimeType[] | ListEnumAnimeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAnimeTypeFilter<$PrismaModel> | $Enums.AnimeType
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumSeasonNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Season | EnumSeasonFieldRefInput<$PrismaModel> | null
    in?: $Enums.Season[] | ListEnumSeasonFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Season[] | ListEnumSeasonFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSeasonNullableFilter<$PrismaModel> | $Enums.Season | null
  }

  export type AnimeGenreListRelationFilter = {
    every?: AnimeGenreWhereInput
    some?: AnimeGenreWhereInput
    none?: AnimeGenreWhereInput
  }

  export type EpisodeListRelationFilter = {
    every?: EpisodeWhereInput
    some?: EpisodeWhereInput
    none?: EpisodeWhereInput
  }

  export type AnimeGenreOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EpisodeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnimeCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    synopsis?: SortOrder
    status?: SortOrder
    type?: SortOrder
    rating?: SortOrder
    score?: SortOrder
    year?: SortOrder
    season?: SortOrder
    posterKey?: SortOrder
    bannerKey?: SortOrder
    totalEpisodes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnimeAvgOrderByAggregateInput = {
    score?: SortOrder
    year?: SortOrder
    totalEpisodes?: SortOrder
  }

  export type AnimeMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    synopsis?: SortOrder
    status?: SortOrder
    type?: SortOrder
    rating?: SortOrder
    score?: SortOrder
    year?: SortOrder
    season?: SortOrder
    posterKey?: SortOrder
    bannerKey?: SortOrder
    totalEpisodes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnimeMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    synopsis?: SortOrder
    status?: SortOrder
    type?: SortOrder
    rating?: SortOrder
    score?: SortOrder
    year?: SortOrder
    season?: SortOrder
    posterKey?: SortOrder
    bannerKey?: SortOrder
    totalEpisodes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnimeSumOrderByAggregateInput = {
    score?: SortOrder
    year?: SortOrder
    totalEpisodes?: SortOrder
  }

  export type EnumAnimeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AnimeStatus | EnumAnimeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AnimeStatus[] | ListEnumAnimeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnimeStatus[] | ListEnumAnimeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAnimeStatusWithAggregatesFilter<$PrismaModel> | $Enums.AnimeStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAnimeStatusFilter<$PrismaModel>
    _max?: NestedEnumAnimeStatusFilter<$PrismaModel>
  }

  export type EnumAnimeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AnimeType | EnumAnimeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AnimeType[] | ListEnumAnimeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnimeType[] | ListEnumAnimeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAnimeTypeWithAggregatesFilter<$PrismaModel> | $Enums.AnimeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAnimeTypeFilter<$PrismaModel>
    _max?: NestedEnumAnimeTypeFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumSeasonNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Season | EnumSeasonFieldRefInput<$PrismaModel> | null
    in?: $Enums.Season[] | ListEnumSeasonFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Season[] | ListEnumSeasonFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSeasonNullableWithAggregatesFilter<$PrismaModel> | $Enums.Season | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumSeasonNullableFilter<$PrismaModel>
    _max?: NestedEnumSeasonNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type GenreCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
  }

  export type GenreAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type GenreMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
  }

  export type GenreMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
  }

  export type GenreSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type AnimeScalarRelationFilter = {
    is?: AnimeWhereInput
    isNot?: AnimeWhereInput
  }

  export type GenreScalarRelationFilter = {
    is?: GenreWhereInput
    isNot?: GenreWhereInput
  }

  export type AnimeGenreAnimeIdGenreIdCompoundUniqueInput = {
    animeId: string
    genreId: number
  }

  export type AnimeGenreCountOrderByAggregateInput = {
    animeId?: SortOrder
    genreId?: SortOrder
  }

  export type AnimeGenreAvgOrderByAggregateInput = {
    genreId?: SortOrder
  }

  export type AnimeGenreMaxOrderByAggregateInput = {
    animeId?: SortOrder
    genreId?: SortOrder
  }

  export type AnimeGenreMinOrderByAggregateInput = {
    animeId?: SortOrder
    genreId?: SortOrder
  }

  export type AnimeGenreSumOrderByAggregateInput = {
    genreId?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type VideoSourceListRelationFilter = {
    every?: VideoSourceWhereInput
    some?: VideoSourceWhereInput
    none?: VideoSourceWhereInput
  }

  export type SubtitleListRelationFilter = {
    every?: SubtitleWhereInput
    some?: SubtitleWhereInput
    none?: SubtitleWhereInput
  }

  export type VideoSourceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubtitleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EpisodeAnimeIdEpisodeNumberCompoundUniqueInput = {
    animeId: string
    episodeNumber: number
  }

  export type EpisodeCountOrderByAggregateInput = {
    id?: SortOrder
    animeId?: SortOrder
    episodeNumber?: SortOrder
    title?: SortOrder
    synopsis?: SortOrder
    durationSeconds?: SortOrder
    thumbnailKey?: SortOrder
    airedAt?: SortOrder
    viewCount?: SortOrder
    createdAt?: SortOrder
  }

  export type EpisodeAvgOrderByAggregateInput = {
    episodeNumber?: SortOrder
    durationSeconds?: SortOrder
    viewCount?: SortOrder
  }

  export type EpisodeMaxOrderByAggregateInput = {
    id?: SortOrder
    animeId?: SortOrder
    episodeNumber?: SortOrder
    title?: SortOrder
    synopsis?: SortOrder
    durationSeconds?: SortOrder
    thumbnailKey?: SortOrder
    airedAt?: SortOrder
    viewCount?: SortOrder
    createdAt?: SortOrder
  }

  export type EpisodeMinOrderByAggregateInput = {
    id?: SortOrder
    animeId?: SortOrder
    episodeNumber?: SortOrder
    title?: SortOrder
    synopsis?: SortOrder
    durationSeconds?: SortOrder
    thumbnailKey?: SortOrder
    airedAt?: SortOrder
    viewCount?: SortOrder
    createdAt?: SortOrder
  }

  export type EpisodeSumOrderByAggregateInput = {
    episodeNumber?: SortOrder
    durationSeconds?: SortOrder
    viewCount?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumVideoQualityFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoQuality | EnumVideoQualityFieldRefInput<$PrismaModel>
    in?: $Enums.VideoQuality[] | ListEnumVideoQualityFieldRefInput<$PrismaModel>
    notIn?: $Enums.VideoQuality[] | ListEnumVideoQualityFieldRefInput<$PrismaModel>
    not?: NestedEnumVideoQualityFilter<$PrismaModel> | $Enums.VideoQuality
  }

  export type EnumVideoFormatFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoFormat | EnumVideoFormatFieldRefInput<$PrismaModel>
    in?: $Enums.VideoFormat[] | ListEnumVideoFormatFieldRefInput<$PrismaModel>
    notIn?: $Enums.VideoFormat[] | ListEnumVideoFormatFieldRefInput<$PrismaModel>
    not?: NestedEnumVideoFormatFilter<$PrismaModel> | $Enums.VideoFormat
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EpisodeScalarRelationFilter = {
    is?: EpisodeWhereInput
    isNot?: EpisodeWhereInput
  }

  export type VideoSourceCountOrderByAggregateInput = {
    id?: SortOrder
    episodeId?: SortOrder
    quality?: SortOrder
    format?: SortOrder
    r2Key?: SortOrder
    url?: SortOrder
    fileSize?: SortOrder
    isPrimary?: SortOrder
    createdAt?: SortOrder
  }

  export type VideoSourceAvgOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type VideoSourceMaxOrderByAggregateInput = {
    id?: SortOrder
    episodeId?: SortOrder
    quality?: SortOrder
    format?: SortOrder
    r2Key?: SortOrder
    url?: SortOrder
    fileSize?: SortOrder
    isPrimary?: SortOrder
    createdAt?: SortOrder
  }

  export type VideoSourceMinOrderByAggregateInput = {
    id?: SortOrder
    episodeId?: SortOrder
    quality?: SortOrder
    format?: SortOrder
    r2Key?: SortOrder
    url?: SortOrder
    fileSize?: SortOrder
    isPrimary?: SortOrder
    createdAt?: SortOrder
  }

  export type VideoSourceSumOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type EnumVideoQualityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoQuality | EnumVideoQualityFieldRefInput<$PrismaModel>
    in?: $Enums.VideoQuality[] | ListEnumVideoQualityFieldRefInput<$PrismaModel>
    notIn?: $Enums.VideoQuality[] | ListEnumVideoQualityFieldRefInput<$PrismaModel>
    not?: NestedEnumVideoQualityWithAggregatesFilter<$PrismaModel> | $Enums.VideoQuality
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVideoQualityFilter<$PrismaModel>
    _max?: NestedEnumVideoQualityFilter<$PrismaModel>
  }

  export type EnumVideoFormatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoFormat | EnumVideoFormatFieldRefInput<$PrismaModel>
    in?: $Enums.VideoFormat[] | ListEnumVideoFormatFieldRefInput<$PrismaModel>
    notIn?: $Enums.VideoFormat[] | ListEnumVideoFormatFieldRefInput<$PrismaModel>
    not?: NestedEnumVideoFormatWithAggregatesFilter<$PrismaModel> | $Enums.VideoFormat
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVideoFormatFilter<$PrismaModel>
    _max?: NestedEnumVideoFormatFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type SubtitleCountOrderByAggregateInput = {
    id?: SortOrder
    episodeId?: SortOrder
    language?: SortOrder
    label?: SortOrder
    r2Key?: SortOrder
    createdAt?: SortOrder
  }

  export type SubtitleMaxOrderByAggregateInput = {
    id?: SortOrder
    episodeId?: SortOrder
    language?: SortOrder
    label?: SortOrder
    r2Key?: SortOrder
    createdAt?: SortOrder
  }

  export type SubtitleMinOrderByAggregateInput = {
    id?: SortOrder
    episodeId?: SortOrder
    language?: SortOrder
    label?: SortOrder
    r2Key?: SortOrder
    createdAt?: SortOrder
  }

  export type ProfileScalarRelationFilter = {
    is?: ProfileWhereInput
    isNot?: ProfileWhereInput
  }

  export type WatchHistoryUserIdEpisodeIdCompoundUniqueInput = {
    userId: string
    episodeId: string
  }

  export type WatchHistoryCountOrderByAggregateInput = {
    userId?: SortOrder
    episodeId?: SortOrder
    progress?: SortOrder
    completed?: SortOrder
    updatedAt?: SortOrder
  }

  export type WatchHistoryAvgOrderByAggregateInput = {
    progress?: SortOrder
  }

  export type WatchHistoryMaxOrderByAggregateInput = {
    userId?: SortOrder
    episodeId?: SortOrder
    progress?: SortOrder
    completed?: SortOrder
    updatedAt?: SortOrder
  }

  export type WatchHistoryMinOrderByAggregateInput = {
    userId?: SortOrder
    episodeId?: SortOrder
    progress?: SortOrder
    completed?: SortOrder
    updatedAt?: SortOrder
  }

  export type WatchHistorySumOrderByAggregateInput = {
    progress?: SortOrder
  }

  export type EnumBookmarkStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookmarkStatus | EnumBookmarkStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookmarkStatus[] | ListEnumBookmarkStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookmarkStatus[] | ListEnumBookmarkStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookmarkStatusFilter<$PrismaModel> | $Enums.BookmarkStatus
  }

  export type BookmarkUserIdAnimeIdCompoundUniqueInput = {
    userId: string
    animeId: string
  }

  export type BookmarkCountOrderByAggregateInput = {
    userId?: SortOrder
    animeId?: SortOrder
    status?: SortOrder
    addedAt?: SortOrder
  }

  export type BookmarkMaxOrderByAggregateInput = {
    userId?: SortOrder
    animeId?: SortOrder
    status?: SortOrder
    addedAt?: SortOrder
  }

  export type BookmarkMinOrderByAggregateInput = {
    userId?: SortOrder
    animeId?: SortOrder
    status?: SortOrder
    addedAt?: SortOrder
  }

  export type EnumBookmarkStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookmarkStatus | EnumBookmarkStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookmarkStatus[] | ListEnumBookmarkStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookmarkStatus[] | ListEnumBookmarkStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookmarkStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookmarkStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookmarkStatusFilter<$PrismaModel>
    _max?: NestedEnumBookmarkStatusFilter<$PrismaModel>
  }

  export type CommentNullableScalarRelationFilter = {
    is?: CommentWhereInput | null
    isNot?: CommentWhereInput | null
  }

  export type CommentCountOrderByAggregateInput = {
    id?: SortOrder
    episodeId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
    body?: SortOrder
    isSpoiler?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommentMaxOrderByAggregateInput = {
    id?: SortOrder
    episodeId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
    body?: SortOrder
    isSpoiler?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommentMinOrderByAggregateInput = {
    id?: SortOrder
    episodeId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
    body?: SortOrder
    isSpoiler?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteSettingCountOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteSettingMaxOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteSettingMinOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type WatchHistoryCreateNestedManyWithoutUserInput = {
    create?: XOR<WatchHistoryCreateWithoutUserInput, WatchHistoryUncheckedCreateWithoutUserInput> | WatchHistoryCreateWithoutUserInput[] | WatchHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchHistoryCreateOrConnectWithoutUserInput | WatchHistoryCreateOrConnectWithoutUserInput[]
    createMany?: WatchHistoryCreateManyUserInputEnvelope
    connect?: WatchHistoryWhereUniqueInput | WatchHistoryWhereUniqueInput[]
  }

  export type BookmarkCreateNestedManyWithoutUserInput = {
    create?: XOR<BookmarkCreateWithoutUserInput, BookmarkUncheckedCreateWithoutUserInput> | BookmarkCreateWithoutUserInput[] | BookmarkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutUserInput | BookmarkCreateOrConnectWithoutUserInput[]
    createMany?: BookmarkCreateManyUserInputEnvelope
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
  }

  export type CommentCreateNestedManyWithoutUserInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type WatchHistoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WatchHistoryCreateWithoutUserInput, WatchHistoryUncheckedCreateWithoutUserInput> | WatchHistoryCreateWithoutUserInput[] | WatchHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchHistoryCreateOrConnectWithoutUserInput | WatchHistoryCreateOrConnectWithoutUserInput[]
    createMany?: WatchHistoryCreateManyUserInputEnvelope
    connect?: WatchHistoryWhereUniqueInput | WatchHistoryWhereUniqueInput[]
  }

  export type BookmarkUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BookmarkCreateWithoutUserInput, BookmarkUncheckedCreateWithoutUserInput> | BookmarkCreateWithoutUserInput[] | BookmarkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutUserInput | BookmarkCreateOrConnectWithoutUserInput[]
    createMany?: BookmarkCreateManyUserInputEnvelope
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type WatchHistoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<WatchHistoryCreateWithoutUserInput, WatchHistoryUncheckedCreateWithoutUserInput> | WatchHistoryCreateWithoutUserInput[] | WatchHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchHistoryCreateOrConnectWithoutUserInput | WatchHistoryCreateOrConnectWithoutUserInput[]
    upsert?: WatchHistoryUpsertWithWhereUniqueWithoutUserInput | WatchHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WatchHistoryCreateManyUserInputEnvelope
    set?: WatchHistoryWhereUniqueInput | WatchHistoryWhereUniqueInput[]
    disconnect?: WatchHistoryWhereUniqueInput | WatchHistoryWhereUniqueInput[]
    delete?: WatchHistoryWhereUniqueInput | WatchHistoryWhereUniqueInput[]
    connect?: WatchHistoryWhereUniqueInput | WatchHistoryWhereUniqueInput[]
    update?: WatchHistoryUpdateWithWhereUniqueWithoutUserInput | WatchHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WatchHistoryUpdateManyWithWhereWithoutUserInput | WatchHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WatchHistoryScalarWhereInput | WatchHistoryScalarWhereInput[]
  }

  export type BookmarkUpdateManyWithoutUserNestedInput = {
    create?: XOR<BookmarkCreateWithoutUserInput, BookmarkUncheckedCreateWithoutUserInput> | BookmarkCreateWithoutUserInput[] | BookmarkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutUserInput | BookmarkCreateOrConnectWithoutUserInput[]
    upsert?: BookmarkUpsertWithWhereUniqueWithoutUserInput | BookmarkUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BookmarkCreateManyUserInputEnvelope
    set?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    disconnect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    delete?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    update?: BookmarkUpdateWithWhereUniqueWithoutUserInput | BookmarkUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BookmarkUpdateManyWithWhereWithoutUserInput | BookmarkUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
  }

  export type CommentUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutUserInput | CommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutUserInput | CommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutUserInput | CommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type WatchHistoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WatchHistoryCreateWithoutUserInput, WatchHistoryUncheckedCreateWithoutUserInput> | WatchHistoryCreateWithoutUserInput[] | WatchHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchHistoryCreateOrConnectWithoutUserInput | WatchHistoryCreateOrConnectWithoutUserInput[]
    upsert?: WatchHistoryUpsertWithWhereUniqueWithoutUserInput | WatchHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WatchHistoryCreateManyUserInputEnvelope
    set?: WatchHistoryWhereUniqueInput | WatchHistoryWhereUniqueInput[]
    disconnect?: WatchHistoryWhereUniqueInput | WatchHistoryWhereUniqueInput[]
    delete?: WatchHistoryWhereUniqueInput | WatchHistoryWhereUniqueInput[]
    connect?: WatchHistoryWhereUniqueInput | WatchHistoryWhereUniqueInput[]
    update?: WatchHistoryUpdateWithWhereUniqueWithoutUserInput | WatchHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WatchHistoryUpdateManyWithWhereWithoutUserInput | WatchHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WatchHistoryScalarWhereInput | WatchHistoryScalarWhereInput[]
  }

  export type BookmarkUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BookmarkCreateWithoutUserInput, BookmarkUncheckedCreateWithoutUserInput> | BookmarkCreateWithoutUserInput[] | BookmarkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutUserInput | BookmarkCreateOrConnectWithoutUserInput[]
    upsert?: BookmarkUpsertWithWhereUniqueWithoutUserInput | BookmarkUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BookmarkCreateManyUserInputEnvelope
    set?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    disconnect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    delete?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    update?: BookmarkUpdateWithWhereUniqueWithoutUserInput | BookmarkUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BookmarkUpdateManyWithWhereWithoutUserInput | BookmarkUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutUserInput | CommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutUserInput | CommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutUserInput | CommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type AnimeGenreCreateNestedManyWithoutAnimeInput = {
    create?: XOR<AnimeGenreCreateWithoutAnimeInput, AnimeGenreUncheckedCreateWithoutAnimeInput> | AnimeGenreCreateWithoutAnimeInput[] | AnimeGenreUncheckedCreateWithoutAnimeInput[]
    connectOrCreate?: AnimeGenreCreateOrConnectWithoutAnimeInput | AnimeGenreCreateOrConnectWithoutAnimeInput[]
    createMany?: AnimeGenreCreateManyAnimeInputEnvelope
    connect?: AnimeGenreWhereUniqueInput | AnimeGenreWhereUniqueInput[]
  }

  export type EpisodeCreateNestedManyWithoutAnimeInput = {
    create?: XOR<EpisodeCreateWithoutAnimeInput, EpisodeUncheckedCreateWithoutAnimeInput> | EpisodeCreateWithoutAnimeInput[] | EpisodeUncheckedCreateWithoutAnimeInput[]
    connectOrCreate?: EpisodeCreateOrConnectWithoutAnimeInput | EpisodeCreateOrConnectWithoutAnimeInput[]
    createMany?: EpisodeCreateManyAnimeInputEnvelope
    connect?: EpisodeWhereUniqueInput | EpisodeWhereUniqueInput[]
  }

  export type BookmarkCreateNestedManyWithoutAnimeInput = {
    create?: XOR<BookmarkCreateWithoutAnimeInput, BookmarkUncheckedCreateWithoutAnimeInput> | BookmarkCreateWithoutAnimeInput[] | BookmarkUncheckedCreateWithoutAnimeInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutAnimeInput | BookmarkCreateOrConnectWithoutAnimeInput[]
    createMany?: BookmarkCreateManyAnimeInputEnvelope
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
  }

  export type AnimeGenreUncheckedCreateNestedManyWithoutAnimeInput = {
    create?: XOR<AnimeGenreCreateWithoutAnimeInput, AnimeGenreUncheckedCreateWithoutAnimeInput> | AnimeGenreCreateWithoutAnimeInput[] | AnimeGenreUncheckedCreateWithoutAnimeInput[]
    connectOrCreate?: AnimeGenreCreateOrConnectWithoutAnimeInput | AnimeGenreCreateOrConnectWithoutAnimeInput[]
    createMany?: AnimeGenreCreateManyAnimeInputEnvelope
    connect?: AnimeGenreWhereUniqueInput | AnimeGenreWhereUniqueInput[]
  }

  export type EpisodeUncheckedCreateNestedManyWithoutAnimeInput = {
    create?: XOR<EpisodeCreateWithoutAnimeInput, EpisodeUncheckedCreateWithoutAnimeInput> | EpisodeCreateWithoutAnimeInput[] | EpisodeUncheckedCreateWithoutAnimeInput[]
    connectOrCreate?: EpisodeCreateOrConnectWithoutAnimeInput | EpisodeCreateOrConnectWithoutAnimeInput[]
    createMany?: EpisodeCreateManyAnimeInputEnvelope
    connect?: EpisodeWhereUniqueInput | EpisodeWhereUniqueInput[]
  }

  export type BookmarkUncheckedCreateNestedManyWithoutAnimeInput = {
    create?: XOR<BookmarkCreateWithoutAnimeInput, BookmarkUncheckedCreateWithoutAnimeInput> | BookmarkCreateWithoutAnimeInput[] | BookmarkUncheckedCreateWithoutAnimeInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutAnimeInput | BookmarkCreateOrConnectWithoutAnimeInput[]
    createMany?: BookmarkCreateManyAnimeInputEnvelope
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
  }

  export type EnumAnimeStatusFieldUpdateOperationsInput = {
    set?: $Enums.AnimeStatus
  }

  export type EnumAnimeTypeFieldUpdateOperationsInput = {
    set?: $Enums.AnimeType
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableEnumSeasonFieldUpdateOperationsInput = {
    set?: $Enums.Season | null
  }

  export type AnimeGenreUpdateManyWithoutAnimeNestedInput = {
    create?: XOR<AnimeGenreCreateWithoutAnimeInput, AnimeGenreUncheckedCreateWithoutAnimeInput> | AnimeGenreCreateWithoutAnimeInput[] | AnimeGenreUncheckedCreateWithoutAnimeInput[]
    connectOrCreate?: AnimeGenreCreateOrConnectWithoutAnimeInput | AnimeGenreCreateOrConnectWithoutAnimeInput[]
    upsert?: AnimeGenreUpsertWithWhereUniqueWithoutAnimeInput | AnimeGenreUpsertWithWhereUniqueWithoutAnimeInput[]
    createMany?: AnimeGenreCreateManyAnimeInputEnvelope
    set?: AnimeGenreWhereUniqueInput | AnimeGenreWhereUniqueInput[]
    disconnect?: AnimeGenreWhereUniqueInput | AnimeGenreWhereUniqueInput[]
    delete?: AnimeGenreWhereUniqueInput | AnimeGenreWhereUniqueInput[]
    connect?: AnimeGenreWhereUniqueInput | AnimeGenreWhereUniqueInput[]
    update?: AnimeGenreUpdateWithWhereUniqueWithoutAnimeInput | AnimeGenreUpdateWithWhereUniqueWithoutAnimeInput[]
    updateMany?: AnimeGenreUpdateManyWithWhereWithoutAnimeInput | AnimeGenreUpdateManyWithWhereWithoutAnimeInput[]
    deleteMany?: AnimeGenreScalarWhereInput | AnimeGenreScalarWhereInput[]
  }

  export type EpisodeUpdateManyWithoutAnimeNestedInput = {
    create?: XOR<EpisodeCreateWithoutAnimeInput, EpisodeUncheckedCreateWithoutAnimeInput> | EpisodeCreateWithoutAnimeInput[] | EpisodeUncheckedCreateWithoutAnimeInput[]
    connectOrCreate?: EpisodeCreateOrConnectWithoutAnimeInput | EpisodeCreateOrConnectWithoutAnimeInput[]
    upsert?: EpisodeUpsertWithWhereUniqueWithoutAnimeInput | EpisodeUpsertWithWhereUniqueWithoutAnimeInput[]
    createMany?: EpisodeCreateManyAnimeInputEnvelope
    set?: EpisodeWhereUniqueInput | EpisodeWhereUniqueInput[]
    disconnect?: EpisodeWhereUniqueInput | EpisodeWhereUniqueInput[]
    delete?: EpisodeWhereUniqueInput | EpisodeWhereUniqueInput[]
    connect?: EpisodeWhereUniqueInput | EpisodeWhereUniqueInput[]
    update?: EpisodeUpdateWithWhereUniqueWithoutAnimeInput | EpisodeUpdateWithWhereUniqueWithoutAnimeInput[]
    updateMany?: EpisodeUpdateManyWithWhereWithoutAnimeInput | EpisodeUpdateManyWithWhereWithoutAnimeInput[]
    deleteMany?: EpisodeScalarWhereInput | EpisodeScalarWhereInput[]
  }

  export type BookmarkUpdateManyWithoutAnimeNestedInput = {
    create?: XOR<BookmarkCreateWithoutAnimeInput, BookmarkUncheckedCreateWithoutAnimeInput> | BookmarkCreateWithoutAnimeInput[] | BookmarkUncheckedCreateWithoutAnimeInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutAnimeInput | BookmarkCreateOrConnectWithoutAnimeInput[]
    upsert?: BookmarkUpsertWithWhereUniqueWithoutAnimeInput | BookmarkUpsertWithWhereUniqueWithoutAnimeInput[]
    createMany?: BookmarkCreateManyAnimeInputEnvelope
    set?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    disconnect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    delete?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    update?: BookmarkUpdateWithWhereUniqueWithoutAnimeInput | BookmarkUpdateWithWhereUniqueWithoutAnimeInput[]
    updateMany?: BookmarkUpdateManyWithWhereWithoutAnimeInput | BookmarkUpdateManyWithWhereWithoutAnimeInput[]
    deleteMany?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
  }

  export type AnimeGenreUncheckedUpdateManyWithoutAnimeNestedInput = {
    create?: XOR<AnimeGenreCreateWithoutAnimeInput, AnimeGenreUncheckedCreateWithoutAnimeInput> | AnimeGenreCreateWithoutAnimeInput[] | AnimeGenreUncheckedCreateWithoutAnimeInput[]
    connectOrCreate?: AnimeGenreCreateOrConnectWithoutAnimeInput | AnimeGenreCreateOrConnectWithoutAnimeInput[]
    upsert?: AnimeGenreUpsertWithWhereUniqueWithoutAnimeInput | AnimeGenreUpsertWithWhereUniqueWithoutAnimeInput[]
    createMany?: AnimeGenreCreateManyAnimeInputEnvelope
    set?: AnimeGenreWhereUniqueInput | AnimeGenreWhereUniqueInput[]
    disconnect?: AnimeGenreWhereUniqueInput | AnimeGenreWhereUniqueInput[]
    delete?: AnimeGenreWhereUniqueInput | AnimeGenreWhereUniqueInput[]
    connect?: AnimeGenreWhereUniqueInput | AnimeGenreWhereUniqueInput[]
    update?: AnimeGenreUpdateWithWhereUniqueWithoutAnimeInput | AnimeGenreUpdateWithWhereUniqueWithoutAnimeInput[]
    updateMany?: AnimeGenreUpdateManyWithWhereWithoutAnimeInput | AnimeGenreUpdateManyWithWhereWithoutAnimeInput[]
    deleteMany?: AnimeGenreScalarWhereInput | AnimeGenreScalarWhereInput[]
  }

  export type EpisodeUncheckedUpdateManyWithoutAnimeNestedInput = {
    create?: XOR<EpisodeCreateWithoutAnimeInput, EpisodeUncheckedCreateWithoutAnimeInput> | EpisodeCreateWithoutAnimeInput[] | EpisodeUncheckedCreateWithoutAnimeInput[]
    connectOrCreate?: EpisodeCreateOrConnectWithoutAnimeInput | EpisodeCreateOrConnectWithoutAnimeInput[]
    upsert?: EpisodeUpsertWithWhereUniqueWithoutAnimeInput | EpisodeUpsertWithWhereUniqueWithoutAnimeInput[]
    createMany?: EpisodeCreateManyAnimeInputEnvelope
    set?: EpisodeWhereUniqueInput | EpisodeWhereUniqueInput[]
    disconnect?: EpisodeWhereUniqueInput | EpisodeWhereUniqueInput[]
    delete?: EpisodeWhereUniqueInput | EpisodeWhereUniqueInput[]
    connect?: EpisodeWhereUniqueInput | EpisodeWhereUniqueInput[]
    update?: EpisodeUpdateWithWhereUniqueWithoutAnimeInput | EpisodeUpdateWithWhereUniqueWithoutAnimeInput[]
    updateMany?: EpisodeUpdateManyWithWhereWithoutAnimeInput | EpisodeUpdateManyWithWhereWithoutAnimeInput[]
    deleteMany?: EpisodeScalarWhereInput | EpisodeScalarWhereInput[]
  }

  export type BookmarkUncheckedUpdateManyWithoutAnimeNestedInput = {
    create?: XOR<BookmarkCreateWithoutAnimeInput, BookmarkUncheckedCreateWithoutAnimeInput> | BookmarkCreateWithoutAnimeInput[] | BookmarkUncheckedCreateWithoutAnimeInput[]
    connectOrCreate?: BookmarkCreateOrConnectWithoutAnimeInput | BookmarkCreateOrConnectWithoutAnimeInput[]
    upsert?: BookmarkUpsertWithWhereUniqueWithoutAnimeInput | BookmarkUpsertWithWhereUniqueWithoutAnimeInput[]
    createMany?: BookmarkCreateManyAnimeInputEnvelope
    set?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    disconnect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    delete?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    connect?: BookmarkWhereUniqueInput | BookmarkWhereUniqueInput[]
    update?: BookmarkUpdateWithWhereUniqueWithoutAnimeInput | BookmarkUpdateWithWhereUniqueWithoutAnimeInput[]
    updateMany?: BookmarkUpdateManyWithWhereWithoutAnimeInput | BookmarkUpdateManyWithWhereWithoutAnimeInput[]
    deleteMany?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
  }

  export type AnimeGenreCreateNestedManyWithoutGenreInput = {
    create?: XOR<AnimeGenreCreateWithoutGenreInput, AnimeGenreUncheckedCreateWithoutGenreInput> | AnimeGenreCreateWithoutGenreInput[] | AnimeGenreUncheckedCreateWithoutGenreInput[]
    connectOrCreate?: AnimeGenreCreateOrConnectWithoutGenreInput | AnimeGenreCreateOrConnectWithoutGenreInput[]
    createMany?: AnimeGenreCreateManyGenreInputEnvelope
    connect?: AnimeGenreWhereUniqueInput | AnimeGenreWhereUniqueInput[]
  }

  export type AnimeGenreUncheckedCreateNestedManyWithoutGenreInput = {
    create?: XOR<AnimeGenreCreateWithoutGenreInput, AnimeGenreUncheckedCreateWithoutGenreInput> | AnimeGenreCreateWithoutGenreInput[] | AnimeGenreUncheckedCreateWithoutGenreInput[]
    connectOrCreate?: AnimeGenreCreateOrConnectWithoutGenreInput | AnimeGenreCreateOrConnectWithoutGenreInput[]
    createMany?: AnimeGenreCreateManyGenreInputEnvelope
    connect?: AnimeGenreWhereUniqueInput | AnimeGenreWhereUniqueInput[]
  }

  export type AnimeGenreUpdateManyWithoutGenreNestedInput = {
    create?: XOR<AnimeGenreCreateWithoutGenreInput, AnimeGenreUncheckedCreateWithoutGenreInput> | AnimeGenreCreateWithoutGenreInput[] | AnimeGenreUncheckedCreateWithoutGenreInput[]
    connectOrCreate?: AnimeGenreCreateOrConnectWithoutGenreInput | AnimeGenreCreateOrConnectWithoutGenreInput[]
    upsert?: AnimeGenreUpsertWithWhereUniqueWithoutGenreInput | AnimeGenreUpsertWithWhereUniqueWithoutGenreInput[]
    createMany?: AnimeGenreCreateManyGenreInputEnvelope
    set?: AnimeGenreWhereUniqueInput | AnimeGenreWhereUniqueInput[]
    disconnect?: AnimeGenreWhereUniqueInput | AnimeGenreWhereUniqueInput[]
    delete?: AnimeGenreWhereUniqueInput | AnimeGenreWhereUniqueInput[]
    connect?: AnimeGenreWhereUniqueInput | AnimeGenreWhereUniqueInput[]
    update?: AnimeGenreUpdateWithWhereUniqueWithoutGenreInput | AnimeGenreUpdateWithWhereUniqueWithoutGenreInput[]
    updateMany?: AnimeGenreUpdateManyWithWhereWithoutGenreInput | AnimeGenreUpdateManyWithWhereWithoutGenreInput[]
    deleteMany?: AnimeGenreScalarWhereInput | AnimeGenreScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AnimeGenreUncheckedUpdateManyWithoutGenreNestedInput = {
    create?: XOR<AnimeGenreCreateWithoutGenreInput, AnimeGenreUncheckedCreateWithoutGenreInput> | AnimeGenreCreateWithoutGenreInput[] | AnimeGenreUncheckedCreateWithoutGenreInput[]
    connectOrCreate?: AnimeGenreCreateOrConnectWithoutGenreInput | AnimeGenreCreateOrConnectWithoutGenreInput[]
    upsert?: AnimeGenreUpsertWithWhereUniqueWithoutGenreInput | AnimeGenreUpsertWithWhereUniqueWithoutGenreInput[]
    createMany?: AnimeGenreCreateManyGenreInputEnvelope
    set?: AnimeGenreWhereUniqueInput | AnimeGenreWhereUniqueInput[]
    disconnect?: AnimeGenreWhereUniqueInput | AnimeGenreWhereUniqueInput[]
    delete?: AnimeGenreWhereUniqueInput | AnimeGenreWhereUniqueInput[]
    connect?: AnimeGenreWhereUniqueInput | AnimeGenreWhereUniqueInput[]
    update?: AnimeGenreUpdateWithWhereUniqueWithoutGenreInput | AnimeGenreUpdateWithWhereUniqueWithoutGenreInput[]
    updateMany?: AnimeGenreUpdateManyWithWhereWithoutGenreInput | AnimeGenreUpdateManyWithWhereWithoutGenreInput[]
    deleteMany?: AnimeGenreScalarWhereInput | AnimeGenreScalarWhereInput[]
  }

  export type AnimeCreateNestedOneWithoutGenresInput = {
    create?: XOR<AnimeCreateWithoutGenresInput, AnimeUncheckedCreateWithoutGenresInput>
    connectOrCreate?: AnimeCreateOrConnectWithoutGenresInput
    connect?: AnimeWhereUniqueInput
  }

  export type GenreCreateNestedOneWithoutAnimesInput = {
    create?: XOR<GenreCreateWithoutAnimesInput, GenreUncheckedCreateWithoutAnimesInput>
    connectOrCreate?: GenreCreateOrConnectWithoutAnimesInput
    connect?: GenreWhereUniqueInput
  }

  export type AnimeUpdateOneRequiredWithoutGenresNestedInput = {
    create?: XOR<AnimeCreateWithoutGenresInput, AnimeUncheckedCreateWithoutGenresInput>
    connectOrCreate?: AnimeCreateOrConnectWithoutGenresInput
    upsert?: AnimeUpsertWithoutGenresInput
    connect?: AnimeWhereUniqueInput
    update?: XOR<XOR<AnimeUpdateToOneWithWhereWithoutGenresInput, AnimeUpdateWithoutGenresInput>, AnimeUncheckedUpdateWithoutGenresInput>
  }

  export type GenreUpdateOneRequiredWithoutAnimesNestedInput = {
    create?: XOR<GenreCreateWithoutAnimesInput, GenreUncheckedCreateWithoutAnimesInput>
    connectOrCreate?: GenreCreateOrConnectWithoutAnimesInput
    upsert?: GenreUpsertWithoutAnimesInput
    connect?: GenreWhereUniqueInput
    update?: XOR<XOR<GenreUpdateToOneWithWhereWithoutAnimesInput, GenreUpdateWithoutAnimesInput>, GenreUncheckedUpdateWithoutAnimesInput>
  }

  export type AnimeCreateNestedOneWithoutEpisodesInput = {
    create?: XOR<AnimeCreateWithoutEpisodesInput, AnimeUncheckedCreateWithoutEpisodesInput>
    connectOrCreate?: AnimeCreateOrConnectWithoutEpisodesInput
    connect?: AnimeWhereUniqueInput
  }

  export type VideoSourceCreateNestedManyWithoutEpisodeInput = {
    create?: XOR<VideoSourceCreateWithoutEpisodeInput, VideoSourceUncheckedCreateWithoutEpisodeInput> | VideoSourceCreateWithoutEpisodeInput[] | VideoSourceUncheckedCreateWithoutEpisodeInput[]
    connectOrCreate?: VideoSourceCreateOrConnectWithoutEpisodeInput | VideoSourceCreateOrConnectWithoutEpisodeInput[]
    createMany?: VideoSourceCreateManyEpisodeInputEnvelope
    connect?: VideoSourceWhereUniqueInput | VideoSourceWhereUniqueInput[]
  }

  export type SubtitleCreateNestedManyWithoutEpisodeInput = {
    create?: XOR<SubtitleCreateWithoutEpisodeInput, SubtitleUncheckedCreateWithoutEpisodeInput> | SubtitleCreateWithoutEpisodeInput[] | SubtitleUncheckedCreateWithoutEpisodeInput[]
    connectOrCreate?: SubtitleCreateOrConnectWithoutEpisodeInput | SubtitleCreateOrConnectWithoutEpisodeInput[]
    createMany?: SubtitleCreateManyEpisodeInputEnvelope
    connect?: SubtitleWhereUniqueInput | SubtitleWhereUniqueInput[]
  }

  export type WatchHistoryCreateNestedManyWithoutEpisodeInput = {
    create?: XOR<WatchHistoryCreateWithoutEpisodeInput, WatchHistoryUncheckedCreateWithoutEpisodeInput> | WatchHistoryCreateWithoutEpisodeInput[] | WatchHistoryUncheckedCreateWithoutEpisodeInput[]
    connectOrCreate?: WatchHistoryCreateOrConnectWithoutEpisodeInput | WatchHistoryCreateOrConnectWithoutEpisodeInput[]
    createMany?: WatchHistoryCreateManyEpisodeInputEnvelope
    connect?: WatchHistoryWhereUniqueInput | WatchHistoryWhereUniqueInput[]
  }

  export type CommentCreateNestedManyWithoutEpisodeInput = {
    create?: XOR<CommentCreateWithoutEpisodeInput, CommentUncheckedCreateWithoutEpisodeInput> | CommentCreateWithoutEpisodeInput[] | CommentUncheckedCreateWithoutEpisodeInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutEpisodeInput | CommentCreateOrConnectWithoutEpisodeInput[]
    createMany?: CommentCreateManyEpisodeInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type VideoSourceUncheckedCreateNestedManyWithoutEpisodeInput = {
    create?: XOR<VideoSourceCreateWithoutEpisodeInput, VideoSourceUncheckedCreateWithoutEpisodeInput> | VideoSourceCreateWithoutEpisodeInput[] | VideoSourceUncheckedCreateWithoutEpisodeInput[]
    connectOrCreate?: VideoSourceCreateOrConnectWithoutEpisodeInput | VideoSourceCreateOrConnectWithoutEpisodeInput[]
    createMany?: VideoSourceCreateManyEpisodeInputEnvelope
    connect?: VideoSourceWhereUniqueInput | VideoSourceWhereUniqueInput[]
  }

  export type SubtitleUncheckedCreateNestedManyWithoutEpisodeInput = {
    create?: XOR<SubtitleCreateWithoutEpisodeInput, SubtitleUncheckedCreateWithoutEpisodeInput> | SubtitleCreateWithoutEpisodeInput[] | SubtitleUncheckedCreateWithoutEpisodeInput[]
    connectOrCreate?: SubtitleCreateOrConnectWithoutEpisodeInput | SubtitleCreateOrConnectWithoutEpisodeInput[]
    createMany?: SubtitleCreateManyEpisodeInputEnvelope
    connect?: SubtitleWhereUniqueInput | SubtitleWhereUniqueInput[]
  }

  export type WatchHistoryUncheckedCreateNestedManyWithoutEpisodeInput = {
    create?: XOR<WatchHistoryCreateWithoutEpisodeInput, WatchHistoryUncheckedCreateWithoutEpisodeInput> | WatchHistoryCreateWithoutEpisodeInput[] | WatchHistoryUncheckedCreateWithoutEpisodeInput[]
    connectOrCreate?: WatchHistoryCreateOrConnectWithoutEpisodeInput | WatchHistoryCreateOrConnectWithoutEpisodeInput[]
    createMany?: WatchHistoryCreateManyEpisodeInputEnvelope
    connect?: WatchHistoryWhereUniqueInput | WatchHistoryWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutEpisodeInput = {
    create?: XOR<CommentCreateWithoutEpisodeInput, CommentUncheckedCreateWithoutEpisodeInput> | CommentCreateWithoutEpisodeInput[] | CommentUncheckedCreateWithoutEpisodeInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutEpisodeInput | CommentCreateOrConnectWithoutEpisodeInput[]
    createMany?: CommentCreateManyEpisodeInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AnimeUpdateOneRequiredWithoutEpisodesNestedInput = {
    create?: XOR<AnimeCreateWithoutEpisodesInput, AnimeUncheckedCreateWithoutEpisodesInput>
    connectOrCreate?: AnimeCreateOrConnectWithoutEpisodesInput
    upsert?: AnimeUpsertWithoutEpisodesInput
    connect?: AnimeWhereUniqueInput
    update?: XOR<XOR<AnimeUpdateToOneWithWhereWithoutEpisodesInput, AnimeUpdateWithoutEpisodesInput>, AnimeUncheckedUpdateWithoutEpisodesInput>
  }

  export type VideoSourceUpdateManyWithoutEpisodeNestedInput = {
    create?: XOR<VideoSourceCreateWithoutEpisodeInput, VideoSourceUncheckedCreateWithoutEpisodeInput> | VideoSourceCreateWithoutEpisodeInput[] | VideoSourceUncheckedCreateWithoutEpisodeInput[]
    connectOrCreate?: VideoSourceCreateOrConnectWithoutEpisodeInput | VideoSourceCreateOrConnectWithoutEpisodeInput[]
    upsert?: VideoSourceUpsertWithWhereUniqueWithoutEpisodeInput | VideoSourceUpsertWithWhereUniqueWithoutEpisodeInput[]
    createMany?: VideoSourceCreateManyEpisodeInputEnvelope
    set?: VideoSourceWhereUniqueInput | VideoSourceWhereUniqueInput[]
    disconnect?: VideoSourceWhereUniqueInput | VideoSourceWhereUniqueInput[]
    delete?: VideoSourceWhereUniqueInput | VideoSourceWhereUniqueInput[]
    connect?: VideoSourceWhereUniqueInput | VideoSourceWhereUniqueInput[]
    update?: VideoSourceUpdateWithWhereUniqueWithoutEpisodeInput | VideoSourceUpdateWithWhereUniqueWithoutEpisodeInput[]
    updateMany?: VideoSourceUpdateManyWithWhereWithoutEpisodeInput | VideoSourceUpdateManyWithWhereWithoutEpisodeInput[]
    deleteMany?: VideoSourceScalarWhereInput | VideoSourceScalarWhereInput[]
  }

  export type SubtitleUpdateManyWithoutEpisodeNestedInput = {
    create?: XOR<SubtitleCreateWithoutEpisodeInput, SubtitleUncheckedCreateWithoutEpisodeInput> | SubtitleCreateWithoutEpisodeInput[] | SubtitleUncheckedCreateWithoutEpisodeInput[]
    connectOrCreate?: SubtitleCreateOrConnectWithoutEpisodeInput | SubtitleCreateOrConnectWithoutEpisodeInput[]
    upsert?: SubtitleUpsertWithWhereUniqueWithoutEpisodeInput | SubtitleUpsertWithWhereUniqueWithoutEpisodeInput[]
    createMany?: SubtitleCreateManyEpisodeInputEnvelope
    set?: SubtitleWhereUniqueInput | SubtitleWhereUniqueInput[]
    disconnect?: SubtitleWhereUniqueInput | SubtitleWhereUniqueInput[]
    delete?: SubtitleWhereUniqueInput | SubtitleWhereUniqueInput[]
    connect?: SubtitleWhereUniqueInput | SubtitleWhereUniqueInput[]
    update?: SubtitleUpdateWithWhereUniqueWithoutEpisodeInput | SubtitleUpdateWithWhereUniqueWithoutEpisodeInput[]
    updateMany?: SubtitleUpdateManyWithWhereWithoutEpisodeInput | SubtitleUpdateManyWithWhereWithoutEpisodeInput[]
    deleteMany?: SubtitleScalarWhereInput | SubtitleScalarWhereInput[]
  }

  export type WatchHistoryUpdateManyWithoutEpisodeNestedInput = {
    create?: XOR<WatchHistoryCreateWithoutEpisodeInput, WatchHistoryUncheckedCreateWithoutEpisodeInput> | WatchHistoryCreateWithoutEpisodeInput[] | WatchHistoryUncheckedCreateWithoutEpisodeInput[]
    connectOrCreate?: WatchHistoryCreateOrConnectWithoutEpisodeInput | WatchHistoryCreateOrConnectWithoutEpisodeInput[]
    upsert?: WatchHistoryUpsertWithWhereUniqueWithoutEpisodeInput | WatchHistoryUpsertWithWhereUniqueWithoutEpisodeInput[]
    createMany?: WatchHistoryCreateManyEpisodeInputEnvelope
    set?: WatchHistoryWhereUniqueInput | WatchHistoryWhereUniqueInput[]
    disconnect?: WatchHistoryWhereUniqueInput | WatchHistoryWhereUniqueInput[]
    delete?: WatchHistoryWhereUniqueInput | WatchHistoryWhereUniqueInput[]
    connect?: WatchHistoryWhereUniqueInput | WatchHistoryWhereUniqueInput[]
    update?: WatchHistoryUpdateWithWhereUniqueWithoutEpisodeInput | WatchHistoryUpdateWithWhereUniqueWithoutEpisodeInput[]
    updateMany?: WatchHistoryUpdateManyWithWhereWithoutEpisodeInput | WatchHistoryUpdateManyWithWhereWithoutEpisodeInput[]
    deleteMany?: WatchHistoryScalarWhereInput | WatchHistoryScalarWhereInput[]
  }

  export type CommentUpdateManyWithoutEpisodeNestedInput = {
    create?: XOR<CommentCreateWithoutEpisodeInput, CommentUncheckedCreateWithoutEpisodeInput> | CommentCreateWithoutEpisodeInput[] | CommentUncheckedCreateWithoutEpisodeInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutEpisodeInput | CommentCreateOrConnectWithoutEpisodeInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutEpisodeInput | CommentUpsertWithWhereUniqueWithoutEpisodeInput[]
    createMany?: CommentCreateManyEpisodeInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutEpisodeInput | CommentUpdateWithWhereUniqueWithoutEpisodeInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutEpisodeInput | CommentUpdateManyWithWhereWithoutEpisodeInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type VideoSourceUncheckedUpdateManyWithoutEpisodeNestedInput = {
    create?: XOR<VideoSourceCreateWithoutEpisodeInput, VideoSourceUncheckedCreateWithoutEpisodeInput> | VideoSourceCreateWithoutEpisodeInput[] | VideoSourceUncheckedCreateWithoutEpisodeInput[]
    connectOrCreate?: VideoSourceCreateOrConnectWithoutEpisodeInput | VideoSourceCreateOrConnectWithoutEpisodeInput[]
    upsert?: VideoSourceUpsertWithWhereUniqueWithoutEpisodeInput | VideoSourceUpsertWithWhereUniqueWithoutEpisodeInput[]
    createMany?: VideoSourceCreateManyEpisodeInputEnvelope
    set?: VideoSourceWhereUniqueInput | VideoSourceWhereUniqueInput[]
    disconnect?: VideoSourceWhereUniqueInput | VideoSourceWhereUniqueInput[]
    delete?: VideoSourceWhereUniqueInput | VideoSourceWhereUniqueInput[]
    connect?: VideoSourceWhereUniqueInput | VideoSourceWhereUniqueInput[]
    update?: VideoSourceUpdateWithWhereUniqueWithoutEpisodeInput | VideoSourceUpdateWithWhereUniqueWithoutEpisodeInput[]
    updateMany?: VideoSourceUpdateManyWithWhereWithoutEpisodeInput | VideoSourceUpdateManyWithWhereWithoutEpisodeInput[]
    deleteMany?: VideoSourceScalarWhereInput | VideoSourceScalarWhereInput[]
  }

  export type SubtitleUncheckedUpdateManyWithoutEpisodeNestedInput = {
    create?: XOR<SubtitleCreateWithoutEpisodeInput, SubtitleUncheckedCreateWithoutEpisodeInput> | SubtitleCreateWithoutEpisodeInput[] | SubtitleUncheckedCreateWithoutEpisodeInput[]
    connectOrCreate?: SubtitleCreateOrConnectWithoutEpisodeInput | SubtitleCreateOrConnectWithoutEpisodeInput[]
    upsert?: SubtitleUpsertWithWhereUniqueWithoutEpisodeInput | SubtitleUpsertWithWhereUniqueWithoutEpisodeInput[]
    createMany?: SubtitleCreateManyEpisodeInputEnvelope
    set?: SubtitleWhereUniqueInput | SubtitleWhereUniqueInput[]
    disconnect?: SubtitleWhereUniqueInput | SubtitleWhereUniqueInput[]
    delete?: SubtitleWhereUniqueInput | SubtitleWhereUniqueInput[]
    connect?: SubtitleWhereUniqueInput | SubtitleWhereUniqueInput[]
    update?: SubtitleUpdateWithWhereUniqueWithoutEpisodeInput | SubtitleUpdateWithWhereUniqueWithoutEpisodeInput[]
    updateMany?: SubtitleUpdateManyWithWhereWithoutEpisodeInput | SubtitleUpdateManyWithWhereWithoutEpisodeInput[]
    deleteMany?: SubtitleScalarWhereInput | SubtitleScalarWhereInput[]
  }

  export type WatchHistoryUncheckedUpdateManyWithoutEpisodeNestedInput = {
    create?: XOR<WatchHistoryCreateWithoutEpisodeInput, WatchHistoryUncheckedCreateWithoutEpisodeInput> | WatchHistoryCreateWithoutEpisodeInput[] | WatchHistoryUncheckedCreateWithoutEpisodeInput[]
    connectOrCreate?: WatchHistoryCreateOrConnectWithoutEpisodeInput | WatchHistoryCreateOrConnectWithoutEpisodeInput[]
    upsert?: WatchHistoryUpsertWithWhereUniqueWithoutEpisodeInput | WatchHistoryUpsertWithWhereUniqueWithoutEpisodeInput[]
    createMany?: WatchHistoryCreateManyEpisodeInputEnvelope
    set?: WatchHistoryWhereUniqueInput | WatchHistoryWhereUniqueInput[]
    disconnect?: WatchHistoryWhereUniqueInput | WatchHistoryWhereUniqueInput[]
    delete?: WatchHistoryWhereUniqueInput | WatchHistoryWhereUniqueInput[]
    connect?: WatchHistoryWhereUniqueInput | WatchHistoryWhereUniqueInput[]
    update?: WatchHistoryUpdateWithWhereUniqueWithoutEpisodeInput | WatchHistoryUpdateWithWhereUniqueWithoutEpisodeInput[]
    updateMany?: WatchHistoryUpdateManyWithWhereWithoutEpisodeInput | WatchHistoryUpdateManyWithWhereWithoutEpisodeInput[]
    deleteMany?: WatchHistoryScalarWhereInput | WatchHistoryScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutEpisodeNestedInput = {
    create?: XOR<CommentCreateWithoutEpisodeInput, CommentUncheckedCreateWithoutEpisodeInput> | CommentCreateWithoutEpisodeInput[] | CommentUncheckedCreateWithoutEpisodeInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutEpisodeInput | CommentCreateOrConnectWithoutEpisodeInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutEpisodeInput | CommentUpsertWithWhereUniqueWithoutEpisodeInput[]
    createMany?: CommentCreateManyEpisodeInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutEpisodeInput | CommentUpdateWithWhereUniqueWithoutEpisodeInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutEpisodeInput | CommentUpdateManyWithWhereWithoutEpisodeInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type EpisodeCreateNestedOneWithoutVideoSourcesInput = {
    create?: XOR<EpisodeCreateWithoutVideoSourcesInput, EpisodeUncheckedCreateWithoutVideoSourcesInput>
    connectOrCreate?: EpisodeCreateOrConnectWithoutVideoSourcesInput
    connect?: EpisodeWhereUniqueInput
  }

  export type EnumVideoQualityFieldUpdateOperationsInput = {
    set?: $Enums.VideoQuality
  }

  export type EnumVideoFormatFieldUpdateOperationsInput = {
    set?: $Enums.VideoFormat
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EpisodeUpdateOneRequiredWithoutVideoSourcesNestedInput = {
    create?: XOR<EpisodeCreateWithoutVideoSourcesInput, EpisodeUncheckedCreateWithoutVideoSourcesInput>
    connectOrCreate?: EpisodeCreateOrConnectWithoutVideoSourcesInput
    upsert?: EpisodeUpsertWithoutVideoSourcesInput
    connect?: EpisodeWhereUniqueInput
    update?: XOR<XOR<EpisodeUpdateToOneWithWhereWithoutVideoSourcesInput, EpisodeUpdateWithoutVideoSourcesInput>, EpisodeUncheckedUpdateWithoutVideoSourcesInput>
  }

  export type EpisodeCreateNestedOneWithoutSubtitlesInput = {
    create?: XOR<EpisodeCreateWithoutSubtitlesInput, EpisodeUncheckedCreateWithoutSubtitlesInput>
    connectOrCreate?: EpisodeCreateOrConnectWithoutSubtitlesInput
    connect?: EpisodeWhereUniqueInput
  }

  export type EpisodeUpdateOneRequiredWithoutSubtitlesNestedInput = {
    create?: XOR<EpisodeCreateWithoutSubtitlesInput, EpisodeUncheckedCreateWithoutSubtitlesInput>
    connectOrCreate?: EpisodeCreateOrConnectWithoutSubtitlesInput
    upsert?: EpisodeUpsertWithoutSubtitlesInput
    connect?: EpisodeWhereUniqueInput
    update?: XOR<XOR<EpisodeUpdateToOneWithWhereWithoutSubtitlesInput, EpisodeUpdateWithoutSubtitlesInput>, EpisodeUncheckedUpdateWithoutSubtitlesInput>
  }

  export type ProfileCreateNestedOneWithoutWatchHistoryInput = {
    create?: XOR<ProfileCreateWithoutWatchHistoryInput, ProfileUncheckedCreateWithoutWatchHistoryInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutWatchHistoryInput
    connect?: ProfileWhereUniqueInput
  }

  export type EpisodeCreateNestedOneWithoutWatchHistoryInput = {
    create?: XOR<EpisodeCreateWithoutWatchHistoryInput, EpisodeUncheckedCreateWithoutWatchHistoryInput>
    connectOrCreate?: EpisodeCreateOrConnectWithoutWatchHistoryInput
    connect?: EpisodeWhereUniqueInput
  }

  export type ProfileUpdateOneRequiredWithoutWatchHistoryNestedInput = {
    create?: XOR<ProfileCreateWithoutWatchHistoryInput, ProfileUncheckedCreateWithoutWatchHistoryInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutWatchHistoryInput
    upsert?: ProfileUpsertWithoutWatchHistoryInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutWatchHistoryInput, ProfileUpdateWithoutWatchHistoryInput>, ProfileUncheckedUpdateWithoutWatchHistoryInput>
  }

  export type EpisodeUpdateOneRequiredWithoutWatchHistoryNestedInput = {
    create?: XOR<EpisodeCreateWithoutWatchHistoryInput, EpisodeUncheckedCreateWithoutWatchHistoryInput>
    connectOrCreate?: EpisodeCreateOrConnectWithoutWatchHistoryInput
    upsert?: EpisodeUpsertWithoutWatchHistoryInput
    connect?: EpisodeWhereUniqueInput
    update?: XOR<XOR<EpisodeUpdateToOneWithWhereWithoutWatchHistoryInput, EpisodeUpdateWithoutWatchHistoryInput>, EpisodeUncheckedUpdateWithoutWatchHistoryInput>
  }

  export type ProfileCreateNestedOneWithoutBookmarksInput = {
    create?: XOR<ProfileCreateWithoutBookmarksInput, ProfileUncheckedCreateWithoutBookmarksInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutBookmarksInput
    connect?: ProfileWhereUniqueInput
  }

  export type AnimeCreateNestedOneWithoutBookmarksInput = {
    create?: XOR<AnimeCreateWithoutBookmarksInput, AnimeUncheckedCreateWithoutBookmarksInput>
    connectOrCreate?: AnimeCreateOrConnectWithoutBookmarksInput
    connect?: AnimeWhereUniqueInput
  }

  export type EnumBookmarkStatusFieldUpdateOperationsInput = {
    set?: $Enums.BookmarkStatus
  }

  export type ProfileUpdateOneRequiredWithoutBookmarksNestedInput = {
    create?: XOR<ProfileCreateWithoutBookmarksInput, ProfileUncheckedCreateWithoutBookmarksInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutBookmarksInput
    upsert?: ProfileUpsertWithoutBookmarksInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutBookmarksInput, ProfileUpdateWithoutBookmarksInput>, ProfileUncheckedUpdateWithoutBookmarksInput>
  }

  export type AnimeUpdateOneRequiredWithoutBookmarksNestedInput = {
    create?: XOR<AnimeCreateWithoutBookmarksInput, AnimeUncheckedCreateWithoutBookmarksInput>
    connectOrCreate?: AnimeCreateOrConnectWithoutBookmarksInput
    upsert?: AnimeUpsertWithoutBookmarksInput
    connect?: AnimeWhereUniqueInput
    update?: XOR<XOR<AnimeUpdateToOneWithWhereWithoutBookmarksInput, AnimeUpdateWithoutBookmarksInput>, AnimeUncheckedUpdateWithoutBookmarksInput>
  }

  export type EpisodeCreateNestedOneWithoutCommentsInput = {
    create?: XOR<EpisodeCreateWithoutCommentsInput, EpisodeUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: EpisodeCreateOrConnectWithoutCommentsInput
    connect?: EpisodeWhereUniqueInput
  }

  export type ProfileCreateNestedOneWithoutCommentsInput = {
    create?: XOR<ProfileCreateWithoutCommentsInput, ProfileUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutCommentsInput
    connect?: ProfileWhereUniqueInput
  }

  export type CommentCreateNestedOneWithoutRepliesInput = {
    create?: XOR<CommentCreateWithoutRepliesInput, CommentUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: CommentCreateOrConnectWithoutRepliesInput
    connect?: CommentWhereUniqueInput
  }

  export type CommentCreateNestedManyWithoutParentInput = {
    create?: XOR<CommentCreateWithoutParentInput, CommentUncheckedCreateWithoutParentInput> | CommentCreateWithoutParentInput[] | CommentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutParentInput | CommentCreateOrConnectWithoutParentInput[]
    createMany?: CommentCreateManyParentInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<CommentCreateWithoutParentInput, CommentUncheckedCreateWithoutParentInput> | CommentCreateWithoutParentInput[] | CommentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutParentInput | CommentCreateOrConnectWithoutParentInput[]
    createMany?: CommentCreateManyParentInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type EpisodeUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<EpisodeCreateWithoutCommentsInput, EpisodeUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: EpisodeCreateOrConnectWithoutCommentsInput
    upsert?: EpisodeUpsertWithoutCommentsInput
    connect?: EpisodeWhereUniqueInput
    update?: XOR<XOR<EpisodeUpdateToOneWithWhereWithoutCommentsInput, EpisodeUpdateWithoutCommentsInput>, EpisodeUncheckedUpdateWithoutCommentsInput>
  }

  export type ProfileUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<ProfileCreateWithoutCommentsInput, ProfileUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutCommentsInput
    upsert?: ProfileUpsertWithoutCommentsInput
    connect?: ProfileWhereUniqueInput
    update?: XOR<XOR<ProfileUpdateToOneWithWhereWithoutCommentsInput, ProfileUpdateWithoutCommentsInput>, ProfileUncheckedUpdateWithoutCommentsInput>
  }

  export type CommentUpdateOneWithoutRepliesNestedInput = {
    create?: XOR<CommentCreateWithoutRepliesInput, CommentUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: CommentCreateOrConnectWithoutRepliesInput
    upsert?: CommentUpsertWithoutRepliesInput
    disconnect?: CommentWhereInput | boolean
    delete?: CommentWhereInput | boolean
    connect?: CommentWhereUniqueInput
    update?: XOR<XOR<CommentUpdateToOneWithWhereWithoutRepliesInput, CommentUpdateWithoutRepliesInput>, CommentUncheckedUpdateWithoutRepliesInput>
  }

  export type CommentUpdateManyWithoutParentNestedInput = {
    create?: XOR<CommentCreateWithoutParentInput, CommentUncheckedCreateWithoutParentInput> | CommentCreateWithoutParentInput[] | CommentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutParentInput | CommentCreateOrConnectWithoutParentInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutParentInput | CommentUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: CommentCreateManyParentInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutParentInput | CommentUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutParentInput | CommentUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<CommentCreateWithoutParentInput, CommentUncheckedCreateWithoutParentInput> | CommentCreateWithoutParentInput[] | CommentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutParentInput | CommentCreateOrConnectWithoutParentInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutParentInput | CommentUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: CommentCreateManyParentInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutParentInput | CommentUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutParentInput | CommentUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumAnimeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AnimeStatus | EnumAnimeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AnimeStatus[] | ListEnumAnimeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnimeStatus[] | ListEnumAnimeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAnimeStatusFilter<$PrismaModel> | $Enums.AnimeStatus
  }

  export type NestedEnumAnimeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AnimeType | EnumAnimeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AnimeType[] | ListEnumAnimeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnimeType[] | ListEnumAnimeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAnimeTypeFilter<$PrismaModel> | $Enums.AnimeType
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumSeasonNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Season | EnumSeasonFieldRefInput<$PrismaModel> | null
    in?: $Enums.Season[] | ListEnumSeasonFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Season[] | ListEnumSeasonFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSeasonNullableFilter<$PrismaModel> | $Enums.Season | null
  }

  export type NestedEnumAnimeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AnimeStatus | EnumAnimeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AnimeStatus[] | ListEnumAnimeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnimeStatus[] | ListEnumAnimeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAnimeStatusWithAggregatesFilter<$PrismaModel> | $Enums.AnimeStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAnimeStatusFilter<$PrismaModel>
    _max?: NestedEnumAnimeStatusFilter<$PrismaModel>
  }

  export type NestedEnumAnimeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AnimeType | EnumAnimeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AnimeType[] | ListEnumAnimeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnimeType[] | ListEnumAnimeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAnimeTypeWithAggregatesFilter<$PrismaModel> | $Enums.AnimeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAnimeTypeFilter<$PrismaModel>
    _max?: NestedEnumAnimeTypeFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedEnumSeasonNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Season | EnumSeasonFieldRefInput<$PrismaModel> | null
    in?: $Enums.Season[] | ListEnumSeasonFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Season[] | ListEnumSeasonFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSeasonNullableWithAggregatesFilter<$PrismaModel> | $Enums.Season | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumSeasonNullableFilter<$PrismaModel>
    _max?: NestedEnumSeasonNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumVideoQualityFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoQuality | EnumVideoQualityFieldRefInput<$PrismaModel>
    in?: $Enums.VideoQuality[] | ListEnumVideoQualityFieldRefInput<$PrismaModel>
    notIn?: $Enums.VideoQuality[] | ListEnumVideoQualityFieldRefInput<$PrismaModel>
    not?: NestedEnumVideoQualityFilter<$PrismaModel> | $Enums.VideoQuality
  }

  export type NestedEnumVideoFormatFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoFormat | EnumVideoFormatFieldRefInput<$PrismaModel>
    in?: $Enums.VideoFormat[] | ListEnumVideoFormatFieldRefInput<$PrismaModel>
    notIn?: $Enums.VideoFormat[] | ListEnumVideoFormatFieldRefInput<$PrismaModel>
    not?: NestedEnumVideoFormatFilter<$PrismaModel> | $Enums.VideoFormat
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumVideoQualityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoQuality | EnumVideoQualityFieldRefInput<$PrismaModel>
    in?: $Enums.VideoQuality[] | ListEnumVideoQualityFieldRefInput<$PrismaModel>
    notIn?: $Enums.VideoQuality[] | ListEnumVideoQualityFieldRefInput<$PrismaModel>
    not?: NestedEnumVideoQualityWithAggregatesFilter<$PrismaModel> | $Enums.VideoQuality
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVideoQualityFilter<$PrismaModel>
    _max?: NestedEnumVideoQualityFilter<$PrismaModel>
  }

  export type NestedEnumVideoFormatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VideoFormat | EnumVideoFormatFieldRefInput<$PrismaModel>
    in?: $Enums.VideoFormat[] | ListEnumVideoFormatFieldRefInput<$PrismaModel>
    notIn?: $Enums.VideoFormat[] | ListEnumVideoFormatFieldRefInput<$PrismaModel>
    not?: NestedEnumVideoFormatWithAggregatesFilter<$PrismaModel> | $Enums.VideoFormat
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVideoFormatFilter<$PrismaModel>
    _max?: NestedEnumVideoFormatFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumBookmarkStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookmarkStatus | EnumBookmarkStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookmarkStatus[] | ListEnumBookmarkStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookmarkStatus[] | ListEnumBookmarkStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookmarkStatusFilter<$PrismaModel> | $Enums.BookmarkStatus
  }

  export type NestedEnumBookmarkStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookmarkStatus | EnumBookmarkStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookmarkStatus[] | ListEnumBookmarkStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookmarkStatus[] | ListEnumBookmarkStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookmarkStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookmarkStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookmarkStatusFilter<$PrismaModel>
    _max?: NestedEnumBookmarkStatusFilter<$PrismaModel>
  }

  export type WatchHistoryCreateWithoutUserInput = {
    progress?: number
    completed?: boolean
    updatedAt?: Date | string
    episode: EpisodeCreateNestedOneWithoutWatchHistoryInput
  }

  export type WatchHistoryUncheckedCreateWithoutUserInput = {
    episodeId: string
    progress?: number
    completed?: boolean
    updatedAt?: Date | string
  }

  export type WatchHistoryCreateOrConnectWithoutUserInput = {
    where: WatchHistoryWhereUniqueInput
    create: XOR<WatchHistoryCreateWithoutUserInput, WatchHistoryUncheckedCreateWithoutUserInput>
  }

  export type WatchHistoryCreateManyUserInputEnvelope = {
    data: WatchHistoryCreateManyUserInput | WatchHistoryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BookmarkCreateWithoutUserInput = {
    status?: $Enums.BookmarkStatus
    addedAt?: Date | string
    anime: AnimeCreateNestedOneWithoutBookmarksInput
  }

  export type BookmarkUncheckedCreateWithoutUserInput = {
    animeId: string
    status?: $Enums.BookmarkStatus
    addedAt?: Date | string
  }

  export type BookmarkCreateOrConnectWithoutUserInput = {
    where: BookmarkWhereUniqueInput
    create: XOR<BookmarkCreateWithoutUserInput, BookmarkUncheckedCreateWithoutUserInput>
  }

  export type BookmarkCreateManyUserInputEnvelope = {
    data: BookmarkCreateManyUserInput | BookmarkCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CommentCreateWithoutUserInput = {
    id: string
    body: string
    isSpoiler?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    episode: EpisodeCreateNestedOneWithoutCommentsInput
    parent?: CommentCreateNestedOneWithoutRepliesInput
    replies?: CommentCreateNestedManyWithoutParentInput
  }

  export type CommentUncheckedCreateWithoutUserInput = {
    id: string
    episodeId: string
    parentId?: string | null
    body: string
    isSpoiler?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    replies?: CommentUncheckedCreateNestedManyWithoutParentInput
  }

  export type CommentCreateOrConnectWithoutUserInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput>
  }

  export type CommentCreateManyUserInputEnvelope = {
    data: CommentCreateManyUserInput | CommentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WatchHistoryUpsertWithWhereUniqueWithoutUserInput = {
    where: WatchHistoryWhereUniqueInput
    update: XOR<WatchHistoryUpdateWithoutUserInput, WatchHistoryUncheckedUpdateWithoutUserInput>
    create: XOR<WatchHistoryCreateWithoutUserInput, WatchHistoryUncheckedCreateWithoutUserInput>
  }

  export type WatchHistoryUpdateWithWhereUniqueWithoutUserInput = {
    where: WatchHistoryWhereUniqueInput
    data: XOR<WatchHistoryUpdateWithoutUserInput, WatchHistoryUncheckedUpdateWithoutUserInput>
  }

  export type WatchHistoryUpdateManyWithWhereWithoutUserInput = {
    where: WatchHistoryScalarWhereInput
    data: XOR<WatchHistoryUpdateManyMutationInput, WatchHistoryUncheckedUpdateManyWithoutUserInput>
  }

  export type WatchHistoryScalarWhereInput = {
    AND?: WatchHistoryScalarWhereInput | WatchHistoryScalarWhereInput[]
    OR?: WatchHistoryScalarWhereInput[]
    NOT?: WatchHistoryScalarWhereInput | WatchHistoryScalarWhereInput[]
    userId?: StringFilter<"WatchHistory"> | string
    episodeId?: StringFilter<"WatchHistory"> | string
    progress?: IntFilter<"WatchHistory"> | number
    completed?: BoolFilter<"WatchHistory"> | boolean
    updatedAt?: DateTimeFilter<"WatchHistory"> | Date | string
  }

  export type BookmarkUpsertWithWhereUniqueWithoutUserInput = {
    where: BookmarkWhereUniqueInput
    update: XOR<BookmarkUpdateWithoutUserInput, BookmarkUncheckedUpdateWithoutUserInput>
    create: XOR<BookmarkCreateWithoutUserInput, BookmarkUncheckedCreateWithoutUserInput>
  }

  export type BookmarkUpdateWithWhereUniqueWithoutUserInput = {
    where: BookmarkWhereUniqueInput
    data: XOR<BookmarkUpdateWithoutUserInput, BookmarkUncheckedUpdateWithoutUserInput>
  }

  export type BookmarkUpdateManyWithWhereWithoutUserInput = {
    where: BookmarkScalarWhereInput
    data: XOR<BookmarkUpdateManyMutationInput, BookmarkUncheckedUpdateManyWithoutUserInput>
  }

  export type BookmarkScalarWhereInput = {
    AND?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
    OR?: BookmarkScalarWhereInput[]
    NOT?: BookmarkScalarWhereInput | BookmarkScalarWhereInput[]
    userId?: StringFilter<"Bookmark"> | string
    animeId?: StringFilter<"Bookmark"> | string
    status?: EnumBookmarkStatusFilter<"Bookmark"> | $Enums.BookmarkStatus
    addedAt?: DateTimeFilter<"Bookmark"> | Date | string
  }

  export type CommentUpsertWithWhereUniqueWithoutUserInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutUserInput, CommentUncheckedUpdateWithoutUserInput>
    create: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutUserInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutUserInput, CommentUncheckedUpdateWithoutUserInput>
  }

  export type CommentUpdateManyWithWhereWithoutUserInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutUserInput>
  }

  export type CommentScalarWhereInput = {
    AND?: CommentScalarWhereInput | CommentScalarWhereInput[]
    OR?: CommentScalarWhereInput[]
    NOT?: CommentScalarWhereInput | CommentScalarWhereInput[]
    id?: StringFilter<"Comment"> | string
    episodeId?: StringFilter<"Comment"> | string
    userId?: StringFilter<"Comment"> | string
    parentId?: StringNullableFilter<"Comment"> | string | null
    body?: StringFilter<"Comment"> | string
    isSpoiler?: BoolFilter<"Comment"> | boolean
    isDeleted?: BoolFilter<"Comment"> | boolean
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    updatedAt?: DateTimeFilter<"Comment"> | Date | string
  }

  export type AnimeGenreCreateWithoutAnimeInput = {
    genre: GenreCreateNestedOneWithoutAnimesInput
  }

  export type AnimeGenreUncheckedCreateWithoutAnimeInput = {
    genreId: number
  }

  export type AnimeGenreCreateOrConnectWithoutAnimeInput = {
    where: AnimeGenreWhereUniqueInput
    create: XOR<AnimeGenreCreateWithoutAnimeInput, AnimeGenreUncheckedCreateWithoutAnimeInput>
  }

  export type AnimeGenreCreateManyAnimeInputEnvelope = {
    data: AnimeGenreCreateManyAnimeInput | AnimeGenreCreateManyAnimeInput[]
    skipDuplicates?: boolean
  }

  export type EpisodeCreateWithoutAnimeInput = {
    id: string
    episodeNumber: number
    title?: string | null
    synopsis?: string | null
    durationSeconds?: number | null
    thumbnailKey?: string | null
    airedAt?: Date | string | null
    viewCount?: number
    createdAt?: Date | string
    videoSources?: VideoSourceCreateNestedManyWithoutEpisodeInput
    subtitles?: SubtitleCreateNestedManyWithoutEpisodeInput
    watchHistory?: WatchHistoryCreateNestedManyWithoutEpisodeInput
    comments?: CommentCreateNestedManyWithoutEpisodeInput
  }

  export type EpisodeUncheckedCreateWithoutAnimeInput = {
    id: string
    episodeNumber: number
    title?: string | null
    synopsis?: string | null
    durationSeconds?: number | null
    thumbnailKey?: string | null
    airedAt?: Date | string | null
    viewCount?: number
    createdAt?: Date | string
    videoSources?: VideoSourceUncheckedCreateNestedManyWithoutEpisodeInput
    subtitles?: SubtitleUncheckedCreateNestedManyWithoutEpisodeInput
    watchHistory?: WatchHistoryUncheckedCreateNestedManyWithoutEpisodeInput
    comments?: CommentUncheckedCreateNestedManyWithoutEpisodeInput
  }

  export type EpisodeCreateOrConnectWithoutAnimeInput = {
    where: EpisodeWhereUniqueInput
    create: XOR<EpisodeCreateWithoutAnimeInput, EpisodeUncheckedCreateWithoutAnimeInput>
  }

  export type EpisodeCreateManyAnimeInputEnvelope = {
    data: EpisodeCreateManyAnimeInput | EpisodeCreateManyAnimeInput[]
    skipDuplicates?: boolean
  }

  export type BookmarkCreateWithoutAnimeInput = {
    status?: $Enums.BookmarkStatus
    addedAt?: Date | string
    user: ProfileCreateNestedOneWithoutBookmarksInput
  }

  export type BookmarkUncheckedCreateWithoutAnimeInput = {
    userId: string
    status?: $Enums.BookmarkStatus
    addedAt?: Date | string
  }

  export type BookmarkCreateOrConnectWithoutAnimeInput = {
    where: BookmarkWhereUniqueInput
    create: XOR<BookmarkCreateWithoutAnimeInput, BookmarkUncheckedCreateWithoutAnimeInput>
  }

  export type BookmarkCreateManyAnimeInputEnvelope = {
    data: BookmarkCreateManyAnimeInput | BookmarkCreateManyAnimeInput[]
    skipDuplicates?: boolean
  }

  export type AnimeGenreUpsertWithWhereUniqueWithoutAnimeInput = {
    where: AnimeGenreWhereUniqueInput
    update: XOR<AnimeGenreUpdateWithoutAnimeInput, AnimeGenreUncheckedUpdateWithoutAnimeInput>
    create: XOR<AnimeGenreCreateWithoutAnimeInput, AnimeGenreUncheckedCreateWithoutAnimeInput>
  }

  export type AnimeGenreUpdateWithWhereUniqueWithoutAnimeInput = {
    where: AnimeGenreWhereUniqueInput
    data: XOR<AnimeGenreUpdateWithoutAnimeInput, AnimeGenreUncheckedUpdateWithoutAnimeInput>
  }

  export type AnimeGenreUpdateManyWithWhereWithoutAnimeInput = {
    where: AnimeGenreScalarWhereInput
    data: XOR<AnimeGenreUpdateManyMutationInput, AnimeGenreUncheckedUpdateManyWithoutAnimeInput>
  }

  export type AnimeGenreScalarWhereInput = {
    AND?: AnimeGenreScalarWhereInput | AnimeGenreScalarWhereInput[]
    OR?: AnimeGenreScalarWhereInput[]
    NOT?: AnimeGenreScalarWhereInput | AnimeGenreScalarWhereInput[]
    animeId?: StringFilter<"AnimeGenre"> | string
    genreId?: IntFilter<"AnimeGenre"> | number
  }

  export type EpisodeUpsertWithWhereUniqueWithoutAnimeInput = {
    where: EpisodeWhereUniqueInput
    update: XOR<EpisodeUpdateWithoutAnimeInput, EpisodeUncheckedUpdateWithoutAnimeInput>
    create: XOR<EpisodeCreateWithoutAnimeInput, EpisodeUncheckedCreateWithoutAnimeInput>
  }

  export type EpisodeUpdateWithWhereUniqueWithoutAnimeInput = {
    where: EpisodeWhereUniqueInput
    data: XOR<EpisodeUpdateWithoutAnimeInput, EpisodeUncheckedUpdateWithoutAnimeInput>
  }

  export type EpisodeUpdateManyWithWhereWithoutAnimeInput = {
    where: EpisodeScalarWhereInput
    data: XOR<EpisodeUpdateManyMutationInput, EpisodeUncheckedUpdateManyWithoutAnimeInput>
  }

  export type EpisodeScalarWhereInput = {
    AND?: EpisodeScalarWhereInput | EpisodeScalarWhereInput[]
    OR?: EpisodeScalarWhereInput[]
    NOT?: EpisodeScalarWhereInput | EpisodeScalarWhereInput[]
    id?: StringFilter<"Episode"> | string
    animeId?: StringFilter<"Episode"> | string
    episodeNumber?: FloatFilter<"Episode"> | number
    title?: StringNullableFilter<"Episode"> | string | null
    synopsis?: StringNullableFilter<"Episode"> | string | null
    durationSeconds?: IntNullableFilter<"Episode"> | number | null
    thumbnailKey?: StringNullableFilter<"Episode"> | string | null
    airedAt?: DateTimeNullableFilter<"Episode"> | Date | string | null
    viewCount?: IntFilter<"Episode"> | number
    createdAt?: DateTimeFilter<"Episode"> | Date | string
  }

  export type BookmarkUpsertWithWhereUniqueWithoutAnimeInput = {
    where: BookmarkWhereUniqueInput
    update: XOR<BookmarkUpdateWithoutAnimeInput, BookmarkUncheckedUpdateWithoutAnimeInput>
    create: XOR<BookmarkCreateWithoutAnimeInput, BookmarkUncheckedCreateWithoutAnimeInput>
  }

  export type BookmarkUpdateWithWhereUniqueWithoutAnimeInput = {
    where: BookmarkWhereUniqueInput
    data: XOR<BookmarkUpdateWithoutAnimeInput, BookmarkUncheckedUpdateWithoutAnimeInput>
  }

  export type BookmarkUpdateManyWithWhereWithoutAnimeInput = {
    where: BookmarkScalarWhereInput
    data: XOR<BookmarkUpdateManyMutationInput, BookmarkUncheckedUpdateManyWithoutAnimeInput>
  }

  export type AnimeGenreCreateWithoutGenreInput = {
    anime: AnimeCreateNestedOneWithoutGenresInput
  }

  export type AnimeGenreUncheckedCreateWithoutGenreInput = {
    animeId: string
  }

  export type AnimeGenreCreateOrConnectWithoutGenreInput = {
    where: AnimeGenreWhereUniqueInput
    create: XOR<AnimeGenreCreateWithoutGenreInput, AnimeGenreUncheckedCreateWithoutGenreInput>
  }

  export type AnimeGenreCreateManyGenreInputEnvelope = {
    data: AnimeGenreCreateManyGenreInput | AnimeGenreCreateManyGenreInput[]
    skipDuplicates?: boolean
  }

  export type AnimeGenreUpsertWithWhereUniqueWithoutGenreInput = {
    where: AnimeGenreWhereUniqueInput
    update: XOR<AnimeGenreUpdateWithoutGenreInput, AnimeGenreUncheckedUpdateWithoutGenreInput>
    create: XOR<AnimeGenreCreateWithoutGenreInput, AnimeGenreUncheckedCreateWithoutGenreInput>
  }

  export type AnimeGenreUpdateWithWhereUniqueWithoutGenreInput = {
    where: AnimeGenreWhereUniqueInput
    data: XOR<AnimeGenreUpdateWithoutGenreInput, AnimeGenreUncheckedUpdateWithoutGenreInput>
  }

  export type AnimeGenreUpdateManyWithWhereWithoutGenreInput = {
    where: AnimeGenreScalarWhereInput
    data: XOR<AnimeGenreUpdateManyMutationInput, AnimeGenreUncheckedUpdateManyWithoutGenreInput>
  }

  export type AnimeCreateWithoutGenresInput = {
    id: string
    slug: string
    title: string
    synopsis?: string | null
    status: $Enums.AnimeStatus
    type: $Enums.AnimeType
    rating?: string | null
    score?: number | null
    year?: number | null
    season?: $Enums.Season | null
    posterKey?: string | null
    bannerKey?: string | null
    totalEpisodes?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    episodes?: EpisodeCreateNestedManyWithoutAnimeInput
    bookmarks?: BookmarkCreateNestedManyWithoutAnimeInput
  }

  export type AnimeUncheckedCreateWithoutGenresInput = {
    id: string
    slug: string
    title: string
    synopsis?: string | null
    status: $Enums.AnimeStatus
    type: $Enums.AnimeType
    rating?: string | null
    score?: number | null
    year?: number | null
    season?: $Enums.Season | null
    posterKey?: string | null
    bannerKey?: string | null
    totalEpisodes?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    episodes?: EpisodeUncheckedCreateNestedManyWithoutAnimeInput
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutAnimeInput
  }

  export type AnimeCreateOrConnectWithoutGenresInput = {
    where: AnimeWhereUniqueInput
    create: XOR<AnimeCreateWithoutGenresInput, AnimeUncheckedCreateWithoutGenresInput>
  }

  export type GenreCreateWithoutAnimesInput = {
    name: string
    slug: string
  }

  export type GenreUncheckedCreateWithoutAnimesInput = {
    id?: number
    name: string
    slug: string
  }

  export type GenreCreateOrConnectWithoutAnimesInput = {
    where: GenreWhereUniqueInput
    create: XOR<GenreCreateWithoutAnimesInput, GenreUncheckedCreateWithoutAnimesInput>
  }

  export type AnimeUpsertWithoutGenresInput = {
    update: XOR<AnimeUpdateWithoutGenresInput, AnimeUncheckedUpdateWithoutGenresInput>
    create: XOR<AnimeCreateWithoutGenresInput, AnimeUncheckedCreateWithoutGenresInput>
    where?: AnimeWhereInput
  }

  export type AnimeUpdateToOneWithWhereWithoutGenresInput = {
    where?: AnimeWhereInput
    data: XOR<AnimeUpdateWithoutGenresInput, AnimeUncheckedUpdateWithoutGenresInput>
  }

  export type AnimeUpdateWithoutGenresInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAnimeStatusFieldUpdateOperationsInput | $Enums.AnimeStatus
    type?: EnumAnimeTypeFieldUpdateOperationsInput | $Enums.AnimeType
    rating?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    season?: NullableEnumSeasonFieldUpdateOperationsInput | $Enums.Season | null
    posterKey?: NullableStringFieldUpdateOperationsInput | string | null
    bannerKey?: NullableStringFieldUpdateOperationsInput | string | null
    totalEpisodes?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    episodes?: EpisodeUpdateManyWithoutAnimeNestedInput
    bookmarks?: BookmarkUpdateManyWithoutAnimeNestedInput
  }

  export type AnimeUncheckedUpdateWithoutGenresInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAnimeStatusFieldUpdateOperationsInput | $Enums.AnimeStatus
    type?: EnumAnimeTypeFieldUpdateOperationsInput | $Enums.AnimeType
    rating?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    season?: NullableEnumSeasonFieldUpdateOperationsInput | $Enums.Season | null
    posterKey?: NullableStringFieldUpdateOperationsInput | string | null
    bannerKey?: NullableStringFieldUpdateOperationsInput | string | null
    totalEpisodes?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    episodes?: EpisodeUncheckedUpdateManyWithoutAnimeNestedInput
    bookmarks?: BookmarkUncheckedUpdateManyWithoutAnimeNestedInput
  }

  export type GenreUpsertWithoutAnimesInput = {
    update: XOR<GenreUpdateWithoutAnimesInput, GenreUncheckedUpdateWithoutAnimesInput>
    create: XOR<GenreCreateWithoutAnimesInput, GenreUncheckedCreateWithoutAnimesInput>
    where?: GenreWhereInput
  }

  export type GenreUpdateToOneWithWhereWithoutAnimesInput = {
    where?: GenreWhereInput
    data: XOR<GenreUpdateWithoutAnimesInput, GenreUncheckedUpdateWithoutAnimesInput>
  }

  export type GenreUpdateWithoutAnimesInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type GenreUncheckedUpdateWithoutAnimesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type AnimeCreateWithoutEpisodesInput = {
    id: string
    slug: string
    title: string
    synopsis?: string | null
    status: $Enums.AnimeStatus
    type: $Enums.AnimeType
    rating?: string | null
    score?: number | null
    year?: number | null
    season?: $Enums.Season | null
    posterKey?: string | null
    bannerKey?: string | null
    totalEpisodes?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    genres?: AnimeGenreCreateNestedManyWithoutAnimeInput
    bookmarks?: BookmarkCreateNestedManyWithoutAnimeInput
  }

  export type AnimeUncheckedCreateWithoutEpisodesInput = {
    id: string
    slug: string
    title: string
    synopsis?: string | null
    status: $Enums.AnimeStatus
    type: $Enums.AnimeType
    rating?: string | null
    score?: number | null
    year?: number | null
    season?: $Enums.Season | null
    posterKey?: string | null
    bannerKey?: string | null
    totalEpisodes?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    genres?: AnimeGenreUncheckedCreateNestedManyWithoutAnimeInput
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutAnimeInput
  }

  export type AnimeCreateOrConnectWithoutEpisodesInput = {
    where: AnimeWhereUniqueInput
    create: XOR<AnimeCreateWithoutEpisodesInput, AnimeUncheckedCreateWithoutEpisodesInput>
  }

  export type VideoSourceCreateWithoutEpisodeInput = {
    id: string
    quality: $Enums.VideoQuality
    format: $Enums.VideoFormat
    r2Key: string
    url?: string | null
    fileSize?: number | null
    isPrimary?: boolean
    createdAt?: Date | string
  }

  export type VideoSourceUncheckedCreateWithoutEpisodeInput = {
    id: string
    quality: $Enums.VideoQuality
    format: $Enums.VideoFormat
    r2Key: string
    url?: string | null
    fileSize?: number | null
    isPrimary?: boolean
    createdAt?: Date | string
  }

  export type VideoSourceCreateOrConnectWithoutEpisodeInput = {
    where: VideoSourceWhereUniqueInput
    create: XOR<VideoSourceCreateWithoutEpisodeInput, VideoSourceUncheckedCreateWithoutEpisodeInput>
  }

  export type VideoSourceCreateManyEpisodeInputEnvelope = {
    data: VideoSourceCreateManyEpisodeInput | VideoSourceCreateManyEpisodeInput[]
    skipDuplicates?: boolean
  }

  export type SubtitleCreateWithoutEpisodeInput = {
    id: string
    language: string
    label: string
    r2Key: string
    createdAt?: Date | string
  }

  export type SubtitleUncheckedCreateWithoutEpisodeInput = {
    id: string
    language: string
    label: string
    r2Key: string
    createdAt?: Date | string
  }

  export type SubtitleCreateOrConnectWithoutEpisodeInput = {
    where: SubtitleWhereUniqueInput
    create: XOR<SubtitleCreateWithoutEpisodeInput, SubtitleUncheckedCreateWithoutEpisodeInput>
  }

  export type SubtitleCreateManyEpisodeInputEnvelope = {
    data: SubtitleCreateManyEpisodeInput | SubtitleCreateManyEpisodeInput[]
    skipDuplicates?: boolean
  }

  export type WatchHistoryCreateWithoutEpisodeInput = {
    progress?: number
    completed?: boolean
    updatedAt?: Date | string
    user: ProfileCreateNestedOneWithoutWatchHistoryInput
  }

  export type WatchHistoryUncheckedCreateWithoutEpisodeInput = {
    userId: string
    progress?: number
    completed?: boolean
    updatedAt?: Date | string
  }

  export type WatchHistoryCreateOrConnectWithoutEpisodeInput = {
    where: WatchHistoryWhereUniqueInput
    create: XOR<WatchHistoryCreateWithoutEpisodeInput, WatchHistoryUncheckedCreateWithoutEpisodeInput>
  }

  export type WatchHistoryCreateManyEpisodeInputEnvelope = {
    data: WatchHistoryCreateManyEpisodeInput | WatchHistoryCreateManyEpisodeInput[]
    skipDuplicates?: boolean
  }

  export type CommentCreateWithoutEpisodeInput = {
    id: string
    body: string
    isSpoiler?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: ProfileCreateNestedOneWithoutCommentsInput
    parent?: CommentCreateNestedOneWithoutRepliesInput
    replies?: CommentCreateNestedManyWithoutParentInput
  }

  export type CommentUncheckedCreateWithoutEpisodeInput = {
    id: string
    userId: string
    parentId?: string | null
    body: string
    isSpoiler?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    replies?: CommentUncheckedCreateNestedManyWithoutParentInput
  }

  export type CommentCreateOrConnectWithoutEpisodeInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutEpisodeInput, CommentUncheckedCreateWithoutEpisodeInput>
  }

  export type CommentCreateManyEpisodeInputEnvelope = {
    data: CommentCreateManyEpisodeInput | CommentCreateManyEpisodeInput[]
    skipDuplicates?: boolean
  }

  export type AnimeUpsertWithoutEpisodesInput = {
    update: XOR<AnimeUpdateWithoutEpisodesInput, AnimeUncheckedUpdateWithoutEpisodesInput>
    create: XOR<AnimeCreateWithoutEpisodesInput, AnimeUncheckedCreateWithoutEpisodesInput>
    where?: AnimeWhereInput
  }

  export type AnimeUpdateToOneWithWhereWithoutEpisodesInput = {
    where?: AnimeWhereInput
    data: XOR<AnimeUpdateWithoutEpisodesInput, AnimeUncheckedUpdateWithoutEpisodesInput>
  }

  export type AnimeUpdateWithoutEpisodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAnimeStatusFieldUpdateOperationsInput | $Enums.AnimeStatus
    type?: EnumAnimeTypeFieldUpdateOperationsInput | $Enums.AnimeType
    rating?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    season?: NullableEnumSeasonFieldUpdateOperationsInput | $Enums.Season | null
    posterKey?: NullableStringFieldUpdateOperationsInput | string | null
    bannerKey?: NullableStringFieldUpdateOperationsInput | string | null
    totalEpisodes?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    genres?: AnimeGenreUpdateManyWithoutAnimeNestedInput
    bookmarks?: BookmarkUpdateManyWithoutAnimeNestedInput
  }

  export type AnimeUncheckedUpdateWithoutEpisodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAnimeStatusFieldUpdateOperationsInput | $Enums.AnimeStatus
    type?: EnumAnimeTypeFieldUpdateOperationsInput | $Enums.AnimeType
    rating?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    season?: NullableEnumSeasonFieldUpdateOperationsInput | $Enums.Season | null
    posterKey?: NullableStringFieldUpdateOperationsInput | string | null
    bannerKey?: NullableStringFieldUpdateOperationsInput | string | null
    totalEpisodes?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    genres?: AnimeGenreUncheckedUpdateManyWithoutAnimeNestedInput
    bookmarks?: BookmarkUncheckedUpdateManyWithoutAnimeNestedInput
  }

  export type VideoSourceUpsertWithWhereUniqueWithoutEpisodeInput = {
    where: VideoSourceWhereUniqueInput
    update: XOR<VideoSourceUpdateWithoutEpisodeInput, VideoSourceUncheckedUpdateWithoutEpisodeInput>
    create: XOR<VideoSourceCreateWithoutEpisodeInput, VideoSourceUncheckedCreateWithoutEpisodeInput>
  }

  export type VideoSourceUpdateWithWhereUniqueWithoutEpisodeInput = {
    where: VideoSourceWhereUniqueInput
    data: XOR<VideoSourceUpdateWithoutEpisodeInput, VideoSourceUncheckedUpdateWithoutEpisodeInput>
  }

  export type VideoSourceUpdateManyWithWhereWithoutEpisodeInput = {
    where: VideoSourceScalarWhereInput
    data: XOR<VideoSourceUpdateManyMutationInput, VideoSourceUncheckedUpdateManyWithoutEpisodeInput>
  }

  export type VideoSourceScalarWhereInput = {
    AND?: VideoSourceScalarWhereInput | VideoSourceScalarWhereInput[]
    OR?: VideoSourceScalarWhereInput[]
    NOT?: VideoSourceScalarWhereInput | VideoSourceScalarWhereInput[]
    id?: StringFilter<"VideoSource"> | string
    episodeId?: StringFilter<"VideoSource"> | string
    quality?: EnumVideoQualityFilter<"VideoSource"> | $Enums.VideoQuality
    format?: EnumVideoFormatFilter<"VideoSource"> | $Enums.VideoFormat
    r2Key?: StringFilter<"VideoSource"> | string
    url?: StringNullableFilter<"VideoSource"> | string | null
    fileSize?: IntNullableFilter<"VideoSource"> | number | null
    isPrimary?: BoolFilter<"VideoSource"> | boolean
    createdAt?: DateTimeFilter<"VideoSource"> | Date | string
  }

  export type SubtitleUpsertWithWhereUniqueWithoutEpisodeInput = {
    where: SubtitleWhereUniqueInput
    update: XOR<SubtitleUpdateWithoutEpisodeInput, SubtitleUncheckedUpdateWithoutEpisodeInput>
    create: XOR<SubtitleCreateWithoutEpisodeInput, SubtitleUncheckedCreateWithoutEpisodeInput>
  }

  export type SubtitleUpdateWithWhereUniqueWithoutEpisodeInput = {
    where: SubtitleWhereUniqueInput
    data: XOR<SubtitleUpdateWithoutEpisodeInput, SubtitleUncheckedUpdateWithoutEpisodeInput>
  }

  export type SubtitleUpdateManyWithWhereWithoutEpisodeInput = {
    where: SubtitleScalarWhereInput
    data: XOR<SubtitleUpdateManyMutationInput, SubtitleUncheckedUpdateManyWithoutEpisodeInput>
  }

  export type SubtitleScalarWhereInput = {
    AND?: SubtitleScalarWhereInput | SubtitleScalarWhereInput[]
    OR?: SubtitleScalarWhereInput[]
    NOT?: SubtitleScalarWhereInput | SubtitleScalarWhereInput[]
    id?: StringFilter<"Subtitle"> | string
    episodeId?: StringFilter<"Subtitle"> | string
    language?: StringFilter<"Subtitle"> | string
    label?: StringFilter<"Subtitle"> | string
    r2Key?: StringFilter<"Subtitle"> | string
    createdAt?: DateTimeFilter<"Subtitle"> | Date | string
  }

  export type WatchHistoryUpsertWithWhereUniqueWithoutEpisodeInput = {
    where: WatchHistoryWhereUniqueInput
    update: XOR<WatchHistoryUpdateWithoutEpisodeInput, WatchHistoryUncheckedUpdateWithoutEpisodeInput>
    create: XOR<WatchHistoryCreateWithoutEpisodeInput, WatchHistoryUncheckedCreateWithoutEpisodeInput>
  }

  export type WatchHistoryUpdateWithWhereUniqueWithoutEpisodeInput = {
    where: WatchHistoryWhereUniqueInput
    data: XOR<WatchHistoryUpdateWithoutEpisodeInput, WatchHistoryUncheckedUpdateWithoutEpisodeInput>
  }

  export type WatchHistoryUpdateManyWithWhereWithoutEpisodeInput = {
    where: WatchHistoryScalarWhereInput
    data: XOR<WatchHistoryUpdateManyMutationInput, WatchHistoryUncheckedUpdateManyWithoutEpisodeInput>
  }

  export type CommentUpsertWithWhereUniqueWithoutEpisodeInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutEpisodeInput, CommentUncheckedUpdateWithoutEpisodeInput>
    create: XOR<CommentCreateWithoutEpisodeInput, CommentUncheckedCreateWithoutEpisodeInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutEpisodeInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutEpisodeInput, CommentUncheckedUpdateWithoutEpisodeInput>
  }

  export type CommentUpdateManyWithWhereWithoutEpisodeInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutEpisodeInput>
  }

  export type EpisodeCreateWithoutVideoSourcesInput = {
    id: string
    episodeNumber: number
    title?: string | null
    synopsis?: string | null
    durationSeconds?: number | null
    thumbnailKey?: string | null
    airedAt?: Date | string | null
    viewCount?: number
    createdAt?: Date | string
    anime: AnimeCreateNestedOneWithoutEpisodesInput
    subtitles?: SubtitleCreateNestedManyWithoutEpisodeInput
    watchHistory?: WatchHistoryCreateNestedManyWithoutEpisodeInput
    comments?: CommentCreateNestedManyWithoutEpisodeInput
  }

  export type EpisodeUncheckedCreateWithoutVideoSourcesInput = {
    id: string
    animeId: string
    episodeNumber: number
    title?: string | null
    synopsis?: string | null
    durationSeconds?: number | null
    thumbnailKey?: string | null
    airedAt?: Date | string | null
    viewCount?: number
    createdAt?: Date | string
    subtitles?: SubtitleUncheckedCreateNestedManyWithoutEpisodeInput
    watchHistory?: WatchHistoryUncheckedCreateNestedManyWithoutEpisodeInput
    comments?: CommentUncheckedCreateNestedManyWithoutEpisodeInput
  }

  export type EpisodeCreateOrConnectWithoutVideoSourcesInput = {
    where: EpisodeWhereUniqueInput
    create: XOR<EpisodeCreateWithoutVideoSourcesInput, EpisodeUncheckedCreateWithoutVideoSourcesInput>
  }

  export type EpisodeUpsertWithoutVideoSourcesInput = {
    update: XOR<EpisodeUpdateWithoutVideoSourcesInput, EpisodeUncheckedUpdateWithoutVideoSourcesInput>
    create: XOR<EpisodeCreateWithoutVideoSourcesInput, EpisodeUncheckedCreateWithoutVideoSourcesInput>
    where?: EpisodeWhereInput
  }

  export type EpisodeUpdateToOneWithWhereWithoutVideoSourcesInput = {
    where?: EpisodeWhereInput
    data: XOR<EpisodeUpdateWithoutVideoSourcesInput, EpisodeUncheckedUpdateWithoutVideoSourcesInput>
  }

  export type EpisodeUpdateWithoutVideoSourcesInput = {
    id?: StringFieldUpdateOperationsInput | string
    episodeNumber?: FloatFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailKey?: NullableStringFieldUpdateOperationsInput | string | null
    airedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    anime?: AnimeUpdateOneRequiredWithoutEpisodesNestedInput
    subtitles?: SubtitleUpdateManyWithoutEpisodeNestedInput
    watchHistory?: WatchHistoryUpdateManyWithoutEpisodeNestedInput
    comments?: CommentUpdateManyWithoutEpisodeNestedInput
  }

  export type EpisodeUncheckedUpdateWithoutVideoSourcesInput = {
    id?: StringFieldUpdateOperationsInput | string
    animeId?: StringFieldUpdateOperationsInput | string
    episodeNumber?: FloatFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailKey?: NullableStringFieldUpdateOperationsInput | string | null
    airedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subtitles?: SubtitleUncheckedUpdateManyWithoutEpisodeNestedInput
    watchHistory?: WatchHistoryUncheckedUpdateManyWithoutEpisodeNestedInput
    comments?: CommentUncheckedUpdateManyWithoutEpisodeNestedInput
  }

  export type EpisodeCreateWithoutSubtitlesInput = {
    id: string
    episodeNumber: number
    title?: string | null
    synopsis?: string | null
    durationSeconds?: number | null
    thumbnailKey?: string | null
    airedAt?: Date | string | null
    viewCount?: number
    createdAt?: Date | string
    anime: AnimeCreateNestedOneWithoutEpisodesInput
    videoSources?: VideoSourceCreateNestedManyWithoutEpisodeInput
    watchHistory?: WatchHistoryCreateNestedManyWithoutEpisodeInput
    comments?: CommentCreateNestedManyWithoutEpisodeInput
  }

  export type EpisodeUncheckedCreateWithoutSubtitlesInput = {
    id: string
    animeId: string
    episodeNumber: number
    title?: string | null
    synopsis?: string | null
    durationSeconds?: number | null
    thumbnailKey?: string | null
    airedAt?: Date | string | null
    viewCount?: number
    createdAt?: Date | string
    videoSources?: VideoSourceUncheckedCreateNestedManyWithoutEpisodeInput
    watchHistory?: WatchHistoryUncheckedCreateNestedManyWithoutEpisodeInput
    comments?: CommentUncheckedCreateNestedManyWithoutEpisodeInput
  }

  export type EpisodeCreateOrConnectWithoutSubtitlesInput = {
    where: EpisodeWhereUniqueInput
    create: XOR<EpisodeCreateWithoutSubtitlesInput, EpisodeUncheckedCreateWithoutSubtitlesInput>
  }

  export type EpisodeUpsertWithoutSubtitlesInput = {
    update: XOR<EpisodeUpdateWithoutSubtitlesInput, EpisodeUncheckedUpdateWithoutSubtitlesInput>
    create: XOR<EpisodeCreateWithoutSubtitlesInput, EpisodeUncheckedCreateWithoutSubtitlesInput>
    where?: EpisodeWhereInput
  }

  export type EpisodeUpdateToOneWithWhereWithoutSubtitlesInput = {
    where?: EpisodeWhereInput
    data: XOR<EpisodeUpdateWithoutSubtitlesInput, EpisodeUncheckedUpdateWithoutSubtitlesInput>
  }

  export type EpisodeUpdateWithoutSubtitlesInput = {
    id?: StringFieldUpdateOperationsInput | string
    episodeNumber?: FloatFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailKey?: NullableStringFieldUpdateOperationsInput | string | null
    airedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    anime?: AnimeUpdateOneRequiredWithoutEpisodesNestedInput
    videoSources?: VideoSourceUpdateManyWithoutEpisodeNestedInput
    watchHistory?: WatchHistoryUpdateManyWithoutEpisodeNestedInput
    comments?: CommentUpdateManyWithoutEpisodeNestedInput
  }

  export type EpisodeUncheckedUpdateWithoutSubtitlesInput = {
    id?: StringFieldUpdateOperationsInput | string
    animeId?: StringFieldUpdateOperationsInput | string
    episodeNumber?: FloatFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailKey?: NullableStringFieldUpdateOperationsInput | string | null
    airedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videoSources?: VideoSourceUncheckedUpdateManyWithoutEpisodeNestedInput
    watchHistory?: WatchHistoryUncheckedUpdateManyWithoutEpisodeNestedInput
    comments?: CommentUncheckedUpdateManyWithoutEpisodeNestedInput
  }

  export type ProfileCreateWithoutWatchHistoryInput = {
    id: string
    username: string
    displayName?: string | null
    avatarUrl?: string | null
    role?: $Enums.Role
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookmarks?: BookmarkCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
  }

  export type ProfileUncheckedCreateWithoutWatchHistoryInput = {
    id: string
    username: string
    displayName?: string | null
    avatarUrl?: string | null
    role?: $Enums.Role
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
  }

  export type ProfileCreateOrConnectWithoutWatchHistoryInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutWatchHistoryInput, ProfileUncheckedCreateWithoutWatchHistoryInput>
  }

  export type EpisodeCreateWithoutWatchHistoryInput = {
    id: string
    episodeNumber: number
    title?: string | null
    synopsis?: string | null
    durationSeconds?: number | null
    thumbnailKey?: string | null
    airedAt?: Date | string | null
    viewCount?: number
    createdAt?: Date | string
    anime: AnimeCreateNestedOneWithoutEpisodesInput
    videoSources?: VideoSourceCreateNestedManyWithoutEpisodeInput
    subtitles?: SubtitleCreateNestedManyWithoutEpisodeInput
    comments?: CommentCreateNestedManyWithoutEpisodeInput
  }

  export type EpisodeUncheckedCreateWithoutWatchHistoryInput = {
    id: string
    animeId: string
    episodeNumber: number
    title?: string | null
    synopsis?: string | null
    durationSeconds?: number | null
    thumbnailKey?: string | null
    airedAt?: Date | string | null
    viewCount?: number
    createdAt?: Date | string
    videoSources?: VideoSourceUncheckedCreateNestedManyWithoutEpisodeInput
    subtitles?: SubtitleUncheckedCreateNestedManyWithoutEpisodeInput
    comments?: CommentUncheckedCreateNestedManyWithoutEpisodeInput
  }

  export type EpisodeCreateOrConnectWithoutWatchHistoryInput = {
    where: EpisodeWhereUniqueInput
    create: XOR<EpisodeCreateWithoutWatchHistoryInput, EpisodeUncheckedCreateWithoutWatchHistoryInput>
  }

  export type ProfileUpsertWithoutWatchHistoryInput = {
    update: XOR<ProfileUpdateWithoutWatchHistoryInput, ProfileUncheckedUpdateWithoutWatchHistoryInput>
    create: XOR<ProfileCreateWithoutWatchHistoryInput, ProfileUncheckedCreateWithoutWatchHistoryInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutWatchHistoryInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutWatchHistoryInput, ProfileUncheckedUpdateWithoutWatchHistoryInput>
  }

  export type ProfileUpdateWithoutWatchHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookmarks?: BookmarkUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
  }

  export type ProfileUncheckedUpdateWithoutWatchHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookmarks?: BookmarkUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type EpisodeUpsertWithoutWatchHistoryInput = {
    update: XOR<EpisodeUpdateWithoutWatchHistoryInput, EpisodeUncheckedUpdateWithoutWatchHistoryInput>
    create: XOR<EpisodeCreateWithoutWatchHistoryInput, EpisodeUncheckedCreateWithoutWatchHistoryInput>
    where?: EpisodeWhereInput
  }

  export type EpisodeUpdateToOneWithWhereWithoutWatchHistoryInput = {
    where?: EpisodeWhereInput
    data: XOR<EpisodeUpdateWithoutWatchHistoryInput, EpisodeUncheckedUpdateWithoutWatchHistoryInput>
  }

  export type EpisodeUpdateWithoutWatchHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    episodeNumber?: FloatFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailKey?: NullableStringFieldUpdateOperationsInput | string | null
    airedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    anime?: AnimeUpdateOneRequiredWithoutEpisodesNestedInput
    videoSources?: VideoSourceUpdateManyWithoutEpisodeNestedInput
    subtitles?: SubtitleUpdateManyWithoutEpisodeNestedInput
    comments?: CommentUpdateManyWithoutEpisodeNestedInput
  }

  export type EpisodeUncheckedUpdateWithoutWatchHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    animeId?: StringFieldUpdateOperationsInput | string
    episodeNumber?: FloatFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailKey?: NullableStringFieldUpdateOperationsInput | string | null
    airedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videoSources?: VideoSourceUncheckedUpdateManyWithoutEpisodeNestedInput
    subtitles?: SubtitleUncheckedUpdateManyWithoutEpisodeNestedInput
    comments?: CommentUncheckedUpdateManyWithoutEpisodeNestedInput
  }

  export type ProfileCreateWithoutBookmarksInput = {
    id: string
    username: string
    displayName?: string | null
    avatarUrl?: string | null
    role?: $Enums.Role
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    watchHistory?: WatchHistoryCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
  }

  export type ProfileUncheckedCreateWithoutBookmarksInput = {
    id: string
    username: string
    displayName?: string | null
    avatarUrl?: string | null
    role?: $Enums.Role
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    watchHistory?: WatchHistoryUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
  }

  export type ProfileCreateOrConnectWithoutBookmarksInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutBookmarksInput, ProfileUncheckedCreateWithoutBookmarksInput>
  }

  export type AnimeCreateWithoutBookmarksInput = {
    id: string
    slug: string
    title: string
    synopsis?: string | null
    status: $Enums.AnimeStatus
    type: $Enums.AnimeType
    rating?: string | null
    score?: number | null
    year?: number | null
    season?: $Enums.Season | null
    posterKey?: string | null
    bannerKey?: string | null
    totalEpisodes?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    genres?: AnimeGenreCreateNestedManyWithoutAnimeInput
    episodes?: EpisodeCreateNestedManyWithoutAnimeInput
  }

  export type AnimeUncheckedCreateWithoutBookmarksInput = {
    id: string
    slug: string
    title: string
    synopsis?: string | null
    status: $Enums.AnimeStatus
    type: $Enums.AnimeType
    rating?: string | null
    score?: number | null
    year?: number | null
    season?: $Enums.Season | null
    posterKey?: string | null
    bannerKey?: string | null
    totalEpisodes?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    genres?: AnimeGenreUncheckedCreateNestedManyWithoutAnimeInput
    episodes?: EpisodeUncheckedCreateNestedManyWithoutAnimeInput
  }

  export type AnimeCreateOrConnectWithoutBookmarksInput = {
    where: AnimeWhereUniqueInput
    create: XOR<AnimeCreateWithoutBookmarksInput, AnimeUncheckedCreateWithoutBookmarksInput>
  }

  export type ProfileUpsertWithoutBookmarksInput = {
    update: XOR<ProfileUpdateWithoutBookmarksInput, ProfileUncheckedUpdateWithoutBookmarksInput>
    create: XOR<ProfileCreateWithoutBookmarksInput, ProfileUncheckedCreateWithoutBookmarksInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutBookmarksInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutBookmarksInput, ProfileUncheckedUpdateWithoutBookmarksInput>
  }

  export type ProfileUpdateWithoutBookmarksInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    watchHistory?: WatchHistoryUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
  }

  export type ProfileUncheckedUpdateWithoutBookmarksInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    watchHistory?: WatchHistoryUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AnimeUpsertWithoutBookmarksInput = {
    update: XOR<AnimeUpdateWithoutBookmarksInput, AnimeUncheckedUpdateWithoutBookmarksInput>
    create: XOR<AnimeCreateWithoutBookmarksInput, AnimeUncheckedCreateWithoutBookmarksInput>
    where?: AnimeWhereInput
  }

  export type AnimeUpdateToOneWithWhereWithoutBookmarksInput = {
    where?: AnimeWhereInput
    data: XOR<AnimeUpdateWithoutBookmarksInput, AnimeUncheckedUpdateWithoutBookmarksInput>
  }

  export type AnimeUpdateWithoutBookmarksInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAnimeStatusFieldUpdateOperationsInput | $Enums.AnimeStatus
    type?: EnumAnimeTypeFieldUpdateOperationsInput | $Enums.AnimeType
    rating?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    season?: NullableEnumSeasonFieldUpdateOperationsInput | $Enums.Season | null
    posterKey?: NullableStringFieldUpdateOperationsInput | string | null
    bannerKey?: NullableStringFieldUpdateOperationsInput | string | null
    totalEpisodes?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    genres?: AnimeGenreUpdateManyWithoutAnimeNestedInput
    episodes?: EpisodeUpdateManyWithoutAnimeNestedInput
  }

  export type AnimeUncheckedUpdateWithoutBookmarksInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAnimeStatusFieldUpdateOperationsInput | $Enums.AnimeStatus
    type?: EnumAnimeTypeFieldUpdateOperationsInput | $Enums.AnimeType
    rating?: NullableStringFieldUpdateOperationsInput | string | null
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    season?: NullableEnumSeasonFieldUpdateOperationsInput | $Enums.Season | null
    posterKey?: NullableStringFieldUpdateOperationsInput | string | null
    bannerKey?: NullableStringFieldUpdateOperationsInput | string | null
    totalEpisodes?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    genres?: AnimeGenreUncheckedUpdateManyWithoutAnimeNestedInput
    episodes?: EpisodeUncheckedUpdateManyWithoutAnimeNestedInput
  }

  export type EpisodeCreateWithoutCommentsInput = {
    id: string
    episodeNumber: number
    title?: string | null
    synopsis?: string | null
    durationSeconds?: number | null
    thumbnailKey?: string | null
    airedAt?: Date | string | null
    viewCount?: number
    createdAt?: Date | string
    anime: AnimeCreateNestedOneWithoutEpisodesInput
    videoSources?: VideoSourceCreateNestedManyWithoutEpisodeInput
    subtitles?: SubtitleCreateNestedManyWithoutEpisodeInput
    watchHistory?: WatchHistoryCreateNestedManyWithoutEpisodeInput
  }

  export type EpisodeUncheckedCreateWithoutCommentsInput = {
    id: string
    animeId: string
    episodeNumber: number
    title?: string | null
    synopsis?: string | null
    durationSeconds?: number | null
    thumbnailKey?: string | null
    airedAt?: Date | string | null
    viewCount?: number
    createdAt?: Date | string
    videoSources?: VideoSourceUncheckedCreateNestedManyWithoutEpisodeInput
    subtitles?: SubtitleUncheckedCreateNestedManyWithoutEpisodeInput
    watchHistory?: WatchHistoryUncheckedCreateNestedManyWithoutEpisodeInput
  }

  export type EpisodeCreateOrConnectWithoutCommentsInput = {
    where: EpisodeWhereUniqueInput
    create: XOR<EpisodeCreateWithoutCommentsInput, EpisodeUncheckedCreateWithoutCommentsInput>
  }

  export type ProfileCreateWithoutCommentsInput = {
    id: string
    username: string
    displayName?: string | null
    avatarUrl?: string | null
    role?: $Enums.Role
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    watchHistory?: WatchHistoryCreateNestedManyWithoutUserInput
    bookmarks?: BookmarkCreateNestedManyWithoutUserInput
  }

  export type ProfileUncheckedCreateWithoutCommentsInput = {
    id: string
    username: string
    displayName?: string | null
    avatarUrl?: string | null
    role?: $Enums.Role
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    watchHistory?: WatchHistoryUncheckedCreateNestedManyWithoutUserInput
    bookmarks?: BookmarkUncheckedCreateNestedManyWithoutUserInput
  }

  export type ProfileCreateOrConnectWithoutCommentsInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutCommentsInput, ProfileUncheckedCreateWithoutCommentsInput>
  }

  export type CommentCreateWithoutRepliesInput = {
    id: string
    body: string
    isSpoiler?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    episode: EpisodeCreateNestedOneWithoutCommentsInput
    user: ProfileCreateNestedOneWithoutCommentsInput
    parent?: CommentCreateNestedOneWithoutRepliesInput
  }

  export type CommentUncheckedCreateWithoutRepliesInput = {
    id: string
    episodeId: string
    userId: string
    parentId?: string | null
    body: string
    isSpoiler?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommentCreateOrConnectWithoutRepliesInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutRepliesInput, CommentUncheckedCreateWithoutRepliesInput>
  }

  export type CommentCreateWithoutParentInput = {
    id: string
    body: string
    isSpoiler?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    episode: EpisodeCreateNestedOneWithoutCommentsInput
    user: ProfileCreateNestedOneWithoutCommentsInput
    replies?: CommentCreateNestedManyWithoutParentInput
  }

  export type CommentUncheckedCreateWithoutParentInput = {
    id: string
    episodeId: string
    userId: string
    body: string
    isSpoiler?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    replies?: CommentUncheckedCreateNestedManyWithoutParentInput
  }

  export type CommentCreateOrConnectWithoutParentInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutParentInput, CommentUncheckedCreateWithoutParentInput>
  }

  export type CommentCreateManyParentInputEnvelope = {
    data: CommentCreateManyParentInput | CommentCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type EpisodeUpsertWithoutCommentsInput = {
    update: XOR<EpisodeUpdateWithoutCommentsInput, EpisodeUncheckedUpdateWithoutCommentsInput>
    create: XOR<EpisodeCreateWithoutCommentsInput, EpisodeUncheckedCreateWithoutCommentsInput>
    where?: EpisodeWhereInput
  }

  export type EpisodeUpdateToOneWithWhereWithoutCommentsInput = {
    where?: EpisodeWhereInput
    data: XOR<EpisodeUpdateWithoutCommentsInput, EpisodeUncheckedUpdateWithoutCommentsInput>
  }

  export type EpisodeUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    episodeNumber?: FloatFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailKey?: NullableStringFieldUpdateOperationsInput | string | null
    airedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    anime?: AnimeUpdateOneRequiredWithoutEpisodesNestedInput
    videoSources?: VideoSourceUpdateManyWithoutEpisodeNestedInput
    subtitles?: SubtitleUpdateManyWithoutEpisodeNestedInput
    watchHistory?: WatchHistoryUpdateManyWithoutEpisodeNestedInput
  }

  export type EpisodeUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    animeId?: StringFieldUpdateOperationsInput | string
    episodeNumber?: FloatFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailKey?: NullableStringFieldUpdateOperationsInput | string | null
    airedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videoSources?: VideoSourceUncheckedUpdateManyWithoutEpisodeNestedInput
    subtitles?: SubtitleUncheckedUpdateManyWithoutEpisodeNestedInput
    watchHistory?: WatchHistoryUncheckedUpdateManyWithoutEpisodeNestedInput
  }

  export type ProfileUpsertWithoutCommentsInput = {
    update: XOR<ProfileUpdateWithoutCommentsInput, ProfileUncheckedUpdateWithoutCommentsInput>
    create: XOR<ProfileCreateWithoutCommentsInput, ProfileUncheckedCreateWithoutCommentsInput>
    where?: ProfileWhereInput
  }

  export type ProfileUpdateToOneWithWhereWithoutCommentsInput = {
    where?: ProfileWhereInput
    data: XOR<ProfileUpdateWithoutCommentsInput, ProfileUncheckedUpdateWithoutCommentsInput>
  }

  export type ProfileUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    watchHistory?: WatchHistoryUpdateManyWithoutUserNestedInput
    bookmarks?: BookmarkUpdateManyWithoutUserNestedInput
  }

  export type ProfileUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    watchHistory?: WatchHistoryUncheckedUpdateManyWithoutUserNestedInput
    bookmarks?: BookmarkUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CommentUpsertWithoutRepliesInput = {
    update: XOR<CommentUpdateWithoutRepliesInput, CommentUncheckedUpdateWithoutRepliesInput>
    create: XOR<CommentCreateWithoutRepliesInput, CommentUncheckedCreateWithoutRepliesInput>
    where?: CommentWhereInput
  }

  export type CommentUpdateToOneWithWhereWithoutRepliesInput = {
    where?: CommentWhereInput
    data: XOR<CommentUpdateWithoutRepliesInput, CommentUncheckedUpdateWithoutRepliesInput>
  }

  export type CommentUpdateWithoutRepliesInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    isSpoiler?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    episode?: EpisodeUpdateOneRequiredWithoutCommentsNestedInput
    user?: ProfileUpdateOneRequiredWithoutCommentsNestedInput
    parent?: CommentUpdateOneWithoutRepliesNestedInput
  }

  export type CommentUncheckedUpdateWithoutRepliesInput = {
    id?: StringFieldUpdateOperationsInput | string
    episodeId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    isSpoiler?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUpsertWithWhereUniqueWithoutParentInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutParentInput, CommentUncheckedUpdateWithoutParentInput>
    create: XOR<CommentCreateWithoutParentInput, CommentUncheckedCreateWithoutParentInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutParentInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutParentInput, CommentUncheckedUpdateWithoutParentInput>
  }

  export type CommentUpdateManyWithWhereWithoutParentInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutParentInput>
  }

  export type WatchHistoryCreateManyUserInput = {
    episodeId: string
    progress?: number
    completed?: boolean
    updatedAt?: Date | string
  }

  export type BookmarkCreateManyUserInput = {
    animeId: string
    status?: $Enums.BookmarkStatus
    addedAt?: Date | string
  }

  export type CommentCreateManyUserInput = {
    id: string
    episodeId: string
    parentId?: string | null
    body: string
    isSpoiler?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WatchHistoryUpdateWithoutUserInput = {
    progress?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    episode?: EpisodeUpdateOneRequiredWithoutWatchHistoryNestedInput
  }

  export type WatchHistoryUncheckedUpdateWithoutUserInput = {
    episodeId?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchHistoryUncheckedUpdateManyWithoutUserInput = {
    episodeId?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookmarkUpdateWithoutUserInput = {
    status?: EnumBookmarkStatusFieldUpdateOperationsInput | $Enums.BookmarkStatus
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    anime?: AnimeUpdateOneRequiredWithoutBookmarksNestedInput
  }

  export type BookmarkUncheckedUpdateWithoutUserInput = {
    animeId?: StringFieldUpdateOperationsInput | string
    status?: EnumBookmarkStatusFieldUpdateOperationsInput | $Enums.BookmarkStatus
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookmarkUncheckedUpdateManyWithoutUserInput = {
    animeId?: StringFieldUpdateOperationsInput | string
    status?: EnumBookmarkStatusFieldUpdateOperationsInput | $Enums.BookmarkStatus
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    isSpoiler?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    episode?: EpisodeUpdateOneRequiredWithoutCommentsNestedInput
    parent?: CommentUpdateOneWithoutRepliesNestedInput
    replies?: CommentUpdateManyWithoutParentNestedInput
  }

  export type CommentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    episodeId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    isSpoiler?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: CommentUncheckedUpdateManyWithoutParentNestedInput
  }

  export type CommentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    episodeId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    isSpoiler?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnimeGenreCreateManyAnimeInput = {
    genreId: number
  }

  export type EpisodeCreateManyAnimeInput = {
    id: string
    episodeNumber: number
    title?: string | null
    synopsis?: string | null
    durationSeconds?: number | null
    thumbnailKey?: string | null
    airedAt?: Date | string | null
    viewCount?: number
    createdAt?: Date | string
  }

  export type BookmarkCreateManyAnimeInput = {
    userId: string
    status?: $Enums.BookmarkStatus
    addedAt?: Date | string
  }

  export type AnimeGenreUpdateWithoutAnimeInput = {
    genre?: GenreUpdateOneRequiredWithoutAnimesNestedInput
  }

  export type AnimeGenreUncheckedUpdateWithoutAnimeInput = {
    genreId?: IntFieldUpdateOperationsInput | number
  }

  export type AnimeGenreUncheckedUpdateManyWithoutAnimeInput = {
    genreId?: IntFieldUpdateOperationsInput | number
  }

  export type EpisodeUpdateWithoutAnimeInput = {
    id?: StringFieldUpdateOperationsInput | string
    episodeNumber?: FloatFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailKey?: NullableStringFieldUpdateOperationsInput | string | null
    airedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videoSources?: VideoSourceUpdateManyWithoutEpisodeNestedInput
    subtitles?: SubtitleUpdateManyWithoutEpisodeNestedInput
    watchHistory?: WatchHistoryUpdateManyWithoutEpisodeNestedInput
    comments?: CommentUpdateManyWithoutEpisodeNestedInput
  }

  export type EpisodeUncheckedUpdateWithoutAnimeInput = {
    id?: StringFieldUpdateOperationsInput | string
    episodeNumber?: FloatFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailKey?: NullableStringFieldUpdateOperationsInput | string | null
    airedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videoSources?: VideoSourceUncheckedUpdateManyWithoutEpisodeNestedInput
    subtitles?: SubtitleUncheckedUpdateManyWithoutEpisodeNestedInput
    watchHistory?: WatchHistoryUncheckedUpdateManyWithoutEpisodeNestedInput
    comments?: CommentUncheckedUpdateManyWithoutEpisodeNestedInput
  }

  export type EpisodeUncheckedUpdateManyWithoutAnimeInput = {
    id?: StringFieldUpdateOperationsInput | string
    episodeNumber?: FloatFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    synopsis?: NullableStringFieldUpdateOperationsInput | string | null
    durationSeconds?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnailKey?: NullableStringFieldUpdateOperationsInput | string | null
    airedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookmarkUpdateWithoutAnimeInput = {
    status?: EnumBookmarkStatusFieldUpdateOperationsInput | $Enums.BookmarkStatus
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: ProfileUpdateOneRequiredWithoutBookmarksNestedInput
  }

  export type BookmarkUncheckedUpdateWithoutAnimeInput = {
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumBookmarkStatusFieldUpdateOperationsInput | $Enums.BookmarkStatus
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookmarkUncheckedUpdateManyWithoutAnimeInput = {
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumBookmarkStatusFieldUpdateOperationsInput | $Enums.BookmarkStatus
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnimeGenreCreateManyGenreInput = {
    animeId: string
  }

  export type AnimeGenreUpdateWithoutGenreInput = {
    anime?: AnimeUpdateOneRequiredWithoutGenresNestedInput
  }

  export type AnimeGenreUncheckedUpdateWithoutGenreInput = {
    animeId?: StringFieldUpdateOperationsInput | string
  }

  export type AnimeGenreUncheckedUpdateManyWithoutGenreInput = {
    animeId?: StringFieldUpdateOperationsInput | string
  }

  export type VideoSourceCreateManyEpisodeInput = {
    id: string
    quality: $Enums.VideoQuality
    format: $Enums.VideoFormat
    r2Key: string
    url?: string | null
    fileSize?: number | null
    isPrimary?: boolean
    createdAt?: Date | string
  }

  export type SubtitleCreateManyEpisodeInput = {
    id: string
    language: string
    label: string
    r2Key: string
    createdAt?: Date | string
  }

  export type WatchHistoryCreateManyEpisodeInput = {
    userId: string
    progress?: number
    completed?: boolean
    updatedAt?: Date | string
  }

  export type CommentCreateManyEpisodeInput = {
    id: string
    userId: string
    parentId?: string | null
    body: string
    isSpoiler?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VideoSourceUpdateWithoutEpisodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    quality?: EnumVideoQualityFieldUpdateOperationsInput | $Enums.VideoQuality
    format?: EnumVideoFormatFieldUpdateOperationsInput | $Enums.VideoFormat
    r2Key?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoSourceUncheckedUpdateWithoutEpisodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    quality?: EnumVideoQualityFieldUpdateOperationsInput | $Enums.VideoQuality
    format?: EnumVideoFormatFieldUpdateOperationsInput | $Enums.VideoFormat
    r2Key?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoSourceUncheckedUpdateManyWithoutEpisodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    quality?: EnumVideoQualityFieldUpdateOperationsInput | $Enums.VideoQuality
    format?: EnumVideoFormatFieldUpdateOperationsInput | $Enums.VideoFormat
    r2Key?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubtitleUpdateWithoutEpisodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    r2Key?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubtitleUncheckedUpdateWithoutEpisodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    r2Key?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubtitleUncheckedUpdateManyWithoutEpisodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    r2Key?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchHistoryUpdateWithoutEpisodeInput = {
    progress?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: ProfileUpdateOneRequiredWithoutWatchHistoryNestedInput
  }

  export type WatchHistoryUncheckedUpdateWithoutEpisodeInput = {
    userId?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchHistoryUncheckedUpdateManyWithoutEpisodeInput = {
    userId?: StringFieldUpdateOperationsInput | string
    progress?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUpdateWithoutEpisodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    isSpoiler?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: ProfileUpdateOneRequiredWithoutCommentsNestedInput
    parent?: CommentUpdateOneWithoutRepliesNestedInput
    replies?: CommentUpdateManyWithoutParentNestedInput
  }

  export type CommentUncheckedUpdateWithoutEpisodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    isSpoiler?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: CommentUncheckedUpdateManyWithoutParentNestedInput
  }

  export type CommentUncheckedUpdateManyWithoutEpisodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    isSpoiler?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCreateManyParentInput = {
    id: string
    episodeId: string
    userId: string
    body: string
    isSpoiler?: boolean
    isDeleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommentUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    isSpoiler?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    episode?: EpisodeUpdateOneRequiredWithoutCommentsNestedInput
    user?: ProfileUpdateOneRequiredWithoutCommentsNestedInput
    replies?: CommentUpdateManyWithoutParentNestedInput
  }

  export type CommentUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    episodeId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    isSpoiler?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: CommentUncheckedUpdateManyWithoutParentNestedInput
  }

  export type CommentUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    episodeId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    isSpoiler?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}