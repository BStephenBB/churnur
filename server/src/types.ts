export type GoogleUserInfo = {
  sub: string // this is the unique id
  name: string
  given_name: string
  family_name: string
  picture: string
  email: string
  email_verified: boolean
  locale: string
}
