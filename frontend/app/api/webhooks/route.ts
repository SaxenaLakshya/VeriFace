import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
import supabase from '@/lib/supabase/client'

export async function POST(req: NextRequest) {
    try {
        const evt = await verifyWebhook(req)

        const { id } = evt.data
        const eventType = evt.type

        // New user created
        if (eventType === 'user.created') {
            const { data, error } = await supabase.from('users').insert({
                id: id,
                email: evt.data.email_addresses[0].email_address,
                first_name: evt.data.first_name,
                last_name: evt.data.last_name,
                image_url: evt.data.image_url
            })

            if (error) {
                console.error('Error creating user:', error)
            }
        }

        // User updated
        if (eventType === 'user.updated') {
            // console.log('User updated:', evt.data)
            const { data, error } = await supabase.from('users').update({
                first_name: evt.data.first_name,
                last_name: evt.data.last_name,
                image_url: evt.data.image_url
            }).eq('id', id)

            if (error) {
                console.error('Error updating user:', error)
            }
        }

        // User deleted
        if (eventType === 'user.deleted') {
            // console.log('User deleted:', evt.data)
            const { data, error } = await supabase.from('users').delete().eq('id', id)
            if (error) {
                console.error('Error deleting user:', error)
            }
        }

        return new Response('Webhook received', { status: 200 })
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error verifying webhook', { status: 400 })
    }
}