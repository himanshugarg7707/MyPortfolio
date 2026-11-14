import java.util.*;

public class Java_02{
  static int arr[] = new int[5];
  static int top =-1;
  static void push(int data){
    if(top==arr.length-1){
      System.out.println("Stack Overflow");
      return;
    }
    top++;
    arr[top] = data;
  }
  static int pop(){
    if(top==-1){
      System.out.println("Stack Underflow");
      return -1;
    }
    int removed = arr[top];
    top --;
    return removed;
  }
  static int peek(){
    if(top ==-1){
      System.out.println("Stack is empty");
      return -1;

    }
    return arr[top];
  }

  static void display(){
    if(top==-1){
      System.out.println("Stack is empty");
      return;
    }
    for(int i= top;i>=0;i--){
      System.out.println(arr[i]);
    }

  }
  public static void main(String[] args) {
    push(10);
    push(20);
    push(30);
    push(40);
    display();
    System.out.println("::");
    pop();
    pop();
    pop();
    pop();
    display();

  }

}