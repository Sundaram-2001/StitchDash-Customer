import * as Location from "expo-location";

export const getDeviceLocality = async () => {
    const fallback = {
        latitude: 17.3850,
        longitude: 78.4867,
        locality: "Gachibowli", 
        city: "Hyderabad"
    };

    try {
        let { status } = await Location.getForegroundPermissionsAsync();
        
        
        if (status !== "granted") {
            console.log("Permission not active. Prompting user...");
            const requestResult = await Location.requestForegroundPermissionsAsync();
            status = requestResult.status;
        }

        
        if (status !== "granted") {
            console.log("Location permission denied by user. Deploying safety fallback.");
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
            
            console.log("Reverse Geocode Output Data:", place);

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