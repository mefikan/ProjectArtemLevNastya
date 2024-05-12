const { Swipe, Foodproperty, User } = require('../models/models');
const jwt = require('jsonwebtoken');

// Mocking JWT verification function
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn().mockReturnValue({ email: 'test@example.com' })
}));

describe('SwipeController', () => {
    describe('swipeAddProperty', () => {
        it('should add a property to the current user\'s swipe and return the property JSON', async () => {
            // Mock request object
            const req = {
                body: {
                    propertyname: 'Test Property'
                },
                headers: {
                    authorization: 'Bearer token'
                }
            };

            // Mock response object
            const res = {
                json: jest.fn()
            };

            // Mock Foodproperty.create to resolve with a property object
            Foodproperty.create = jest.fn().mockResolvedValue({
                propertyname: 'Test Property',
                SwipeIdswipes: 1 // Mock swipeId
            });

            // Call the controller method
            await SwipeController.swipeAddProperty(req, res);

            // Assert that res.json was called
            expect(res.json).toHaveBeenCalled();

            // Assert that Foodproperty.create was called with correct arguments
            expect(Foodproperty.create).toHaveBeenCalledWith({
                propertyname: 'Test Property',
                SwipeIdswipes: expect.any(Number)
            });
        });
    });

    describe('create', () => {
        it('should create a new swipe for the authenticated user and return the swipe JSON', async () => {
            // Mock request object
            const req = {
                body: {
                    tag: 'Test Tag'
                },
                headers: {
                    authorization: 'Bearer token'
                }
            };

            // Mock response object
            const res = {
                json: jest.fn()
            };

            // Mock Swipe.create to resolve with a swipe object
            Swipe.create = jest.fn().mockResolvedValue({
                tag: 'Test Tag',
                UserIdUser: 1 // Mock UserIdUser
            });

            // Call the controller method
            await SwipeController.create(req, res);

            // Assert that res.json was called
            expect(res.json).toHaveBeenCalled();

            // Assert that Swipe.create was called with correct arguments
            expect(Swipe.create).toHaveBeenCalledWith({
                tag: 'Test Tag',
                UserIdUser: expect.any(Number)
            });
        });
    });

    describe('getAll', () => {
        it('should get all swipes of the authenticated user and return them as JSON', async () => {
            // Mock request object with authorization header
            const req = {
                headers: {
                    authorization: 'Bearer token'
                }
            };

            // Mock response object
            const res = {
                json: jest.fn()
            };

            // Mock Swipe.findAll to resolve with an array of swipes
            Swipe.findAll = jest.fn().mockResolvedValue([
                { tag: 'Swipe 1', UserIdUser: 1 },
                { tag: 'Swipe 2', UserIdUser: 1 }
            ]);

            // Call the controller method
            await SwipeController.getAll(req, res);

            // Assert that res.json was called
            expect(res.json).toHaveBeenCalled();

            // Assert that Swipe.findAll was called with correct arguments
            expect(Swipe.findAll).toHaveBeenCalledWith({
                where: {
                    UserIdUser: expect.any(Number)
                }
            });
        });
    });

    // Add more describe blocks and tests for other methods as needed
});
