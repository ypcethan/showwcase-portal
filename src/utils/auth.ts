import { NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'

const jwtSecret = process.env.JWT_SECRET || 'asdfqwerasdf'
export function createToken(payload: object) {
  return jwt.sign(
    {
      ...payload,
      time: Date.now(),
    },
    jwtSecret,
    {
      expiresIn: '8h',
    }
  )
}

export function signInUser(res: NextApiResponse, token: string) {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('SHOWWCASE_ACCESS_TOKEN', token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  )
}
