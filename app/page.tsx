'use server'

import { cookies, headers } from 'next/headers'
import Login from '@/components/clientLayouts/Login'

const Page = () => {
    const v = cookies().get('token')?.value
    return (
        <Login
            csrfToken={headers().get('X-CSRF-Token') || 'missing'}
            hasLogin={!!v}
        />
    )
}

export default Page
