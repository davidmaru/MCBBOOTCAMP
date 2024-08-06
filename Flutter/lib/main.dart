import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'graphql_config.dart';
import 'users_page.dart';

void main() async {
  await Hive.initFlutter();
  await initHiveForFlutter();

  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GraphQLProvider(
      client: getGraphQLClient(),
      child: CacheProvider(
        child: MaterialApp(
          title: 'Manage Users',
          theme: ThemeData(
            primarySwatch: Colors.green,
            scaffoldBackgroundColor: Colors.lightGreenAccent,
          ),
          home: UsersPage(),
        ),
      ),
    );
  }
}
