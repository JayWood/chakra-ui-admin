'use server'

import { headers } from 'next/headers'
import Login from '@/components/clientLayouts/Login'

const Page = () => (
    <Login csrfToken={headers().get('X-CSRF-Token') || 'missing'} />
)

export default Page
