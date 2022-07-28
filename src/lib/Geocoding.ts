'use strict';

import { countries } from "../data/countries";
import { Address, Bounds, Point } from "../types";


const getCountryBounds = function (search: string): Bounds {
    // eslint-disable-next-line no-var
    var bounds = countries['FR'].bounds;
    Object.keys(countries).map((key) => {
        if (search === key || search === countries[key].name) {
            bounds = countries[key].bounds;
        }
    });
    return bounds;
};

export const geocodeAddress = async function (address: Address): Promise<Point> {
    if (address.country) {
        const request: google.maps.GeocoderRequest = {
            address: address.address,
            bounds: getCountryBounds(address.country)
        };
        const response: google.maps.GeocoderResponse = await new google.maps.Geocoder().geocode(request);
        return response.results[0].geometry.location.toJSON();
    }
    const request: google.maps.GeocoderRequest = {
        address: address.address
    };
    const response: google.maps.GeocoderResponse = await new google.maps.Geocoder().geocode(request);
    return response.results[0].geometry.location.toJSON();
};