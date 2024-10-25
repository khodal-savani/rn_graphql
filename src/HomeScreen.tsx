import React from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from './queries';

interface Country {
    name: string;
    emoji: string;
    capital: string;
}

const HomeScreen = () => {
    const { loading, error, data } = useQuery<{ countries: Country[] }>(GET_COUNTRIES);

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text>Error: {error.message}</Text>;

    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <Text style={styles.pageTitle}>Country's List Using GraphQL</Text>
            </View>
            <View style={styles.tableHeader}>
                <Text style={styles.tableTitle}>Name</Text>
                <Text style={styles.tableTitle}>Flag</Text>
                <Text style={styles.tableTitle}>Capital</Text>
            </View>
            <FlatList
                data={data?.countries}
                renderItem={({ item }) => (
                    <View style={styles.tableRow}>
                        <Text style={styles.cell}>{item.name}</Text>
                        <Text style={styles.cell}>{item.emoji}</Text>
                        <Text style={styles.cell}>{item.capital}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.name}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    headerView: {
        height: 50
    },
    pageTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 500
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        backgroundColor: '#f2f2f2',
    },
    tableTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        flex: 1,
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
    },
});

export default HomeScreen;
