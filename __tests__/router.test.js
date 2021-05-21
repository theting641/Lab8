import { pushToHistory } from "../scripts/router";

/**
 * @jest-environment jsdom
 */
describe('pushToHistory default', () => {
    test('default current', () => {
        //expect(history.length).toBe(2);
        expect(pushToHistory('nothing', ).state).toEqual({});
    });

    test('settings length', () => {
        expect(pushToHistory('settings', 1).length).toBe(3);
    });

    test('settings state', () => {
        expect(pushToHistory('settings', 1).state).toEqual({page: 'settings'});
    });

    test('entry', () => {
        expect(pushToHistory('entry', 4).state).toEqual({page: 'entry4'});
    });

    test('sanity check length', () => {
        expect(pushToHistory('entry', 1).length).toEqual(6);
    });


});


