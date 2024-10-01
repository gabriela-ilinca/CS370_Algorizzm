import { Stack } from 'expo-router';

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name='filter' options={{
                presentation: 'modal',
            }}/>
            <Stack.Screen name='tabs' options={{
                headerShown: false,
            }}/>
        </Stack>
    )
}

export default Layout