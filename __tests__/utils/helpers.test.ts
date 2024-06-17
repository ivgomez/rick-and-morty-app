import {buildUrlWithFilters} from 'utils/helpers';
import {Filter} from 'models/Character';

describe('buildUrlWithFilters', () => {
  it('should return the original URL if no filters are applied', () => {
    const nextUrl = 'https://api.example.com/characters?page=2';
    const filters: Filter = {};
    const result = buildUrlWithFilters(nextUrl, filters);
    expect(result).toBe(nextUrl);
  });

  it('should append the name filter to the URL', () => {
    const nextUrl = 'https://api.example.com/characters?page=2';
    const filters: Filter = {name: 'Rick'};
    const result = buildUrlWithFilters(nextUrl, filters);
    expect(result).toBe('https://api.example.com/characters?page=2&name=Rick');
  });

  it('should append the status filter to the URL', () => {
    const nextUrl = 'https://api.example.com/characters?page=2';
    const filters: Filter = {status: 'alive'};
    const result = buildUrlWithFilters(nextUrl, filters);
    expect(result).toBe(
      'https://api.example.com/characters?page=2&status=alive',
    );
  });

  it('should append multiple filters to the URL', () => {
    const nextUrl = 'https://api.example.com/characters?page=2';
    const filters: Filter = {name: 'Rick', status: 'alive'};
    const result = buildUrlWithFilters(nextUrl, filters);
    expect(result).toBe(
      'https://api.example.com/characters?page=2&name=Rick&status=alive',
    );
  });

  it('should not append filters with empty values to the URL', () => {
    const nextUrl = 'https://api.example.com/characters?page=2';
    const filters: Filter = {name: 'Rick', status: ''};
    const result = buildUrlWithFilters(nextUrl, filters);
    expect(result).toBe('https://api.example.com/characters?page=2&name=Rick');
  });

  it('should handle URLs without existing query parameters', () => {
    const nextUrl = 'https://api.example.com/characters';
    const filters: Filter = {name: 'Rick'};
    const result = buildUrlWithFilters(nextUrl, filters);
    expect(result).toBe('https://api.example.com/characters?name=Rick');
  });

  it('should handle URLs with no page parameter', () => {
    const nextUrl = 'https://api.example.com/characters';
    const filters: Filter = {name: 'Rick', status: 'alive'};
    const result = buildUrlWithFilters(nextUrl, filters);
    expect(result).toBe(
      'https://api.example.com/characters?name=Rick&status=alive',
    );
  });
});
