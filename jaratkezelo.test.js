import {it, expect, beforeEach, describe} from 'vitest';
import { JaratKezelo } from './jaratkezelo';

describe('JaratKezelo', () => {
    let jaratKezelo;

    beforeEach(() => {
        jaratKezelo = new JaratKezelo();
    });

    it('ujJarat: hozzáad egy új járatot', () => {
        jaratKezelo.ujJarat("123", "BUD", "LHR", new Date());
        expect(jaratKezelo.jaratok["123"]).toBeDefined();
    });

    it('ujJarat: hibát dob, ha a járat már létezik', () => {
        jaratKezelo.ujJarat("123", "BUD", "LHR", new Date());
        expect(() => jaratKezelo.ujJarat("123", "BUD", "LHR", new Date())).toThrow("A járatszám már létezik!");
    });

    it('keses: hozzáadja a késést a járathoz', () => {
        jaratKezelo.ujJarat("123", "BUD", "LHR", new Date());
        jaratKezelo.keses("123", 15);
        expect(jaratKezelo.jaratok["123"].keses).toBe(15);
    });

    it('keses: hibát dob, ha a járat nem létezik', () => {
        expect(() => jaratKezelo.keses("123", 15)).toThrow("A járat nem létezik!");
    });

    it('mikorIndul: visszaadja a járat indulási idejét', () => {
        let indulas = new Date();
        jaratKezelo.ujJarat("123", "BUD", "LHR", indulas);
        jaratKezelo.keses("123", 15);
        expect(jaratKezelo.mikorIndul("123")).toEqual(new Date(indulas.getTime() + 15*60000)); 
    });

    it('jaratokRepuloterrol: visszaadja a járatokat a reptérről', () => {
        jaratKezelo.ujJarat("123", "BUD", "LHR", new Date());
        jaratKezelo.ujJarat("456", "BUD", "JFK", new Date());
        jaratKezelo.ujJarat("789", "LHR", "JFK", new Date());
        expect(jaratKezelo.jaratokRepuloterrol("BUD")).toEqual(["123", "456"]);
    });
});