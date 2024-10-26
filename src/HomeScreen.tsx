
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ActivityIndicator, Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_COUNTRY, GET_COUNTRIES } from './queries';

interface Language {
    code: string;
    name: string;
}

interface Country {
    name: string;
    native: string;
    capital: string;
    emoji: string;
    currency: string;
    languages: Language[];
}

interface CountryListItem {
    code: string;
    name: string;
    emoji: string;
}

const HomeScreen: React.FC = () => {
    const [code, setCode] = useState('');
    const [countryDetail, setCountryDetail] = useState<Country | null>(null);
    const [getCountry, { loading: countryLoading, data: countryData, error: countryError }] = useLazyQuery<{ country: Country }>(GET_COUNTRY);
    const { loading: countriesLoading, data: countriesData, error: countriesError } = useQuery<{ countries: CountryListItem[] }>(GET_COUNTRIES);

    const handleGetCountry = () => {
        if (!code.trim()) {
            Alert.alert('Validation Error', 'Country code cannot be blank');
            return;
        }
        getCountry({ variables: { code: code.toUpperCase() } });
    };

    const handleCountryPress = (countryCode: string) => {
        getCountry({ variables: { code: countryCode } });
    };

    useEffect(() => {
        if (countryData?.country) {
            setCountryDetail(countryData.country);
        }
    }, [countryData]);

    useEffect(() => {
        if (countryDetail) {
            Alert.alert(
                `Details for ${countryDetail.name}`,
                `Name: ${countryDetail.name}\nNative: ${countryDetail.native}\nCapital: ${countryDetail.capital}\nEmoji: ${countryDetail.emoji}\nCurrency: ${countryDetail.currency}\nLanguages: ${countryDetail.languages.map(lang => lang.name).join(', ')}`
            );
            setCountryDetail(null);
        }
    }, [countryDetail]);

    if (countriesLoading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (countriesError) return <Text>Error: {countriesError.message}</Text>;

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Enter country code (e.g., BR)"
                style={styles.input}
                value={code}
                onChangeText={setCode}
            />
            <Button title="Get Country" onPress={handleGetCountry} />
            {countryLoading && <ActivityIndicator size="large" color="#0000ff" />}
            {countryError && <Text>Error: {countryError.message}</Text>}

            <FlatList
                data={countriesData?.countries}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleCountryPress(item.code)}>
                        <View style={styles.row}>
                            <Text style={styles.cell}>{item.emoji}</Text>
                            <Text style={styles.cell}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.code}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 10,
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    cell: {
        marginRight: 10
    },
});

export default HomeScreen;
