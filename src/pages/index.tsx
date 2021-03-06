import { GetServerSideProps } from 'next'
import { getUserFromToken } from '@/utils/auth'
import type { IUser } from '@/lib/types'
import MainLayout from '@/components/layout/MainLayout'
import UserNameForm from '@/components/dashboard/UserNameForm'

interface Props {
  user: IUser
}
function Home({ user }: Props) {
  return (
    <MainLayout user={user}>
      <UserNameForm />
    </MainLayout>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.cookies
  const token = cookies.SHOWWCASE_ACCESS_TOKEN
  let user
  if (token) {
    user = await getUserFromToken(token)
  }
  if (user?.name) {
    return {
      redirect: {
        permanent: false,
        destination: '/education',
      },
    }
  }
  return { props: { user: { email: user?.email, name: user?.name } } }
}
