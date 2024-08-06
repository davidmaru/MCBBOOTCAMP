import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'add_users_page.dart';
import 'edit_users_page.dart';

class UsersPage extends StatefulWidget {
  @override
  _UsersPageState createState() => _UsersPageState();
}

class _UsersPageState extends State<UsersPage> {
  final String fetchUsersQuery = """
  query getusers { 
    users {
      id
      name
      age
      address
      phone_number
    }
  }
  """;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Users'),
        leading: Center(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Image.asset('lib/assets/william_samoei_ruto.jpg'),
          ),
        ),
      ),
      backgroundColor: Colors.greenAccent,
      body: Container(
        width: double.infinity,
        height: double.infinity,
        color: Colors.greenAccent,
        child: Center(
          child: Query(
            options: QueryOptions(
              document: gql(fetchUsersQuery),
            ),
            builder: (QueryResult result,
                {VoidCallback? refetch, FetchMore? fetchMore}) {
              if (result.hasException) {
                return Center(child: Text(result.exception.toString()));
              }

              if (result.isLoading) {
                return Center(child: CircularProgressIndicator());
              }

              final List users = result.data?['users'] ?? [];

              return ListView.builder(
                itemCount: users.length,
                itemBuilder: (context, index) {
                  final user = users[index];
                  return Card(
                    child: ListTile(
                        title: Text(user['name']),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Address: ${user['address']}'),
                            Text('Age: ${user['age']}'),
                            Text('phone_number: ${user['phone_number']}'),
                          ],
                        ),
                        trailing: IconButton(
                            icon: Icon(Icons.edit),
                            onPressed: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) =>
                                      EditUsersPage(user: user),
                                ),
                              ).then((value) {
                                refetch?.call();
                              });
                            })),
                  );
                },
              );
            },
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => AddUsersPage()),
          ).then((value) {
            if (value != null) {
              setState(() {});
            }
          });
        },
        child: Icon(Icons.add),
      ),
    );
  }
}
