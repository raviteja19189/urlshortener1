import React, { useEffect, useState } from 'react';
import Service from '../utils/http';
import { Center, Text, Card, Divider, Grid, Avatar } from '@mantine/core';

const obj = new Service();

export default function Profile() {
    const [user, setUser] = useState({});

    const getProfileData = async () => {
        try {
            const data = await obj.get("user/me");
            setUser(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProfileData();
    }, []);

    const profileImageUrl = 'https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png';

    // Fields to exclude from the user details list
    const excludedFields = ["avatar", "name", "email", "_id", "__v", "password"];

    return (
        <Center style={{ minHeight: "80vh" }}>
            <Card shadow="md" padding="lg" radius="md" withBorder style={{ width: 400 }}>
                <Center style={{ flexDirection: 'column', marginBottom: '1rem' }}>
                    <Avatar
                        src={user.avatar || profileImageUrl}
                        alt="User Avatar"
                        radius="50%"
                        size="xl"
                        onError={(e) => {
                            if (e.currentTarget.src !== profileImageUrl) {
                                e.currentTarget.src = profileImageUrl;
                            }
                        }}
                    />
                    <Text size="xl" weight={700} mt="sm">
                        {user?.name || 'User Name'}
                    </Text>
                    <Text size="md" color="dimmed">
                        {user?.email || 'user@example.com'}
                    </Text>
                </Center>

                <Divider my="md" />

                <Grid>
                    {Object.entries(user).map(([key, value]) => {
                        if (!excludedFields.includes(key)) {
                            return (
                                <Grid.Col span={12} key={key}>
                                    <Text size="sm">
                                        <b style={{ textTransform: 'capitalize' }}>{key.replace(/_/g, ' ')}:</b> {String(value)}
                                    </Text>
                                </Grid.Col>
                            );
                        }
                        return null;
                    })}
                </Grid>
            </Card>
        </Center>
    );
}