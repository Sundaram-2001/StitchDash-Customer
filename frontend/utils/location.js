import * as Location from "expo-location";

export const getDeviceLocality = async () => {
    const fallback = {
    latitude: 17.3850,
    longitude: 78.4867,
    city: "Hyderabad"
    };

    try {
    const { status } = await Location.getForegroundPermissionsAsync();
    
    if (status !== "granted") {
        console.log("Location permission not granted. Deploying safety fallback.");
        return fallback;
    }

    const gpsData = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced
    });
    
    const { latitude, longitude } = gpsData.coords;

    
    const geoResponse = await Location.reverseGeocodeAsync({ 
        latitude, 
        longitude 
    });

    if (geoResponse && geoResponse.length > 0) {
        const place = geoResponse[0];
        const locality = place.district || place.subregion || place.name || "Nearby";
        const city = place.city || "Hyderabad";
        
        return {
        latitude,
        longitude,
        locality,
        city
        };
    }

    return fallback;

    } catch (error) {
    console.log("Location fetch pipeline failed:", error);
    return fallback; 
    }
};