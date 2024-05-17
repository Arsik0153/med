import React, { useEffect } from 'react';
import {
    Box,
    Button,
    H2,
    H1,
    Illustration,
    IllustrationProps,
    Text,
} from '@adminjs/design-system';
import { styled } from '@adminjs/design-system/styled-components';
import axios from 'axios';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
    const [users, setUsers] = React.useState([]);
    const [doctors, setDoctors] = React.useState([]);
    const [checkups, setCheckups] = React.useState([]);
    const [chartData, setChartData] = React.useState([]);

    const getData = () => {
        axios.get('/users').then((response) => {
            setUsers(response.data);
        });
        axios.get('/doctors').then((response) => {
            setDoctors(response.data);
        });
        axios.get('/checkups').then((response) => {
            setCheckups(response.data);
            const data = response.data;
            const processedData = data.reduce((acc, user) => {
                const createdAt = new Date(user.date);
                console.log(createdAt.toLocaleDateString());
                const formattedDate = createdAt.toLocaleDateString();
                const existingEntry = acc.find(
                    (entry) => entry.date === formattedDate
                );

                if (existingEntry) {
                    existingEntry.count++;
                } else {
                    acc.push({ date: formattedDate, count: 1 });
                }

                return acc;
            }, []);

            setChartData(processedData);
        });
    };

    useEffect(() => {
        getData();
        setInterval(getData, 3000);
    }, []);
    return (
        <div>
            <Box>
                <Box
                    mb="xl"
                    mx={[0, 0, 0, 'auto']}
                    px={['default', 'lg', 'xxl', '0']}
                    position="relative"
                    flex
                    flexDirection="row"
                    width={[1, 1, 1, 1200]}
                >
                    <Card width={1} m="lg">
                        <H2>Total users</H2>
                        <H1>{users.length}</H1>
                    </Card>
                    <Card width={1} m="lg">
                        <H2>Total doctors</H2>
                        <H1>{doctors.length}</H1>
                    </Card>
                    <Card width={1} m="lg">
                        <H2>Checkups</H2>
                        <H1>{checkups.length}</H1>
                    </Card>
                </Box>
                <Box
                    mb="xl"
                    mx={[0, 0, 0, 'auto']}
                    px={['default', 'lg', 'xxl', '0']}
                    position="relative"
                    flex
                    flexDirection="row"
                    width={[1, 1, 1, 1200]}
                >
                    <Card width={1} m="lg">
                        <H2>Checkups by date</H2>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart
                                width={1000}
                                height={400}
                                data={chartData}
                            >
                                <XAxis dataKey="date" />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#007df0"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </Box>
            </Box>
        </div>
    );
};

export default Dashboard;

const Card = styled(Box)`
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
`;
