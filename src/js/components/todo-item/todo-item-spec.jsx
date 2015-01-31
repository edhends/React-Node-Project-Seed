var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var rewire = require('rewire');
var rewireModule = require('../../../../test/helpers/rewire-module');

describe('TodoItem', function() {
  var TodoItem = rewire('./todo-item.jsx');
  var todoItem, mockTodo;
  var removeTodoSpy = sinon.spy();
  var updateTodoSpy = sinon.spy();

  rewireModule(TodoItem, {
    'AppActions.removeTodo': removeTodoSpy,
    'AppActions.updateTodo': updateTodoSpy,
  });

  beforeEach(function() {
    mockTodo = { _id: 1, name: 'mockTodo', completed: false };
    todoItem = TestUtils.renderIntoDocument(
      <TodoItem todo={mockTodo} />
    );
  });

  it('renders', function() {
    var component = TestUtils.findRenderedDOMComponentWithClass(
      todoItem, 'todoItem'
    );

    expect(component).to.exist();
  });

  describe('deleting a todo', function() {

    beforeEach(function() {

      var deleteButton = TestUtils.findRenderedDOMComponentWithClass(
        todoItem, 'delete-button'
      );

      TestUtils.Simulate.click(deleteButton);
    });

    it('calls the remove todo action with the todo id', function() {

      expect(removeTodoSpy).to.have.been.calledWith(mockTodo._id);
    })
  });

  describe('marking a todo completed', function() {

    beforeEach(function() {
      var completedButton = TestUtils.findRenderedDOMComponentWithClass(
        todoItem, 'completed-button'
      );

      TestUtils.Simulate.click(completedButton);
    });

    it('calls the update todo action and updates the completed state', function() {
      expect(updateTodoSpy).to.have.been.calledWith(
        mockTodo._id, { completed: !mockTodo.completed }
       );
    })
  });
});