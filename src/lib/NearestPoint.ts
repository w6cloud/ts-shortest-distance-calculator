'use strict';

import { Point, Points } from "../types";

/**
 * Calculates the distance between two points
 * 
 * @param a First point
 * @param b Second point
 * @returns number The distance between the two points in meters
 */
export const getDistance = function (a: Point, b: Point): number {
    const R = 6371e3; // metres
    const φ1 = a.lat * Math.PI / 180; // φ, λ in radians
    const φ2 = b.lat * Math.PI / 180;
    const Δφ = (b.lat - a.lat) * Math.PI / 180;
    const Δλ = (b.lng - a.lng) * Math.PI / 180;

    const A = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const C = 2 * Math.atan2(Math.sqrt(A), Math.sqrt(1 - A));

    const d = R * C; // in metres

    return d;
}

export const getNearestPoint = function (basePoint: Point, points: Points): Point {
    return points.reduce(function (resultPoint: Point, currentPoint: Point, index: number): Point {
        if (!index) return currentPoint;
        if (getDistance(basePoint, currentPoint) < getDistance(basePoint, resultPoint)) {
            return currentPoint;
        }
        return resultPoint;
    });
}

export const getSmallestDistance = function (basePoint: Point, points: Points): number {
    return getDistance(basePoint, getNearestPoint(basePoint, points));
}
